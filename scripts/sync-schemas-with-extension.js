// scripts/sync-schemas-with-extension.js
const fs = require("fs");
const path = require("path");
const glob = require("glob");

const SERVER_PATH = path.join(__dirname, "../packages/server");
const EXTENSION_SCHEMAS_PATH = path.join(
  __dirname,
  "../packages/extension/src/schemas",
);

const FILE_HEADER = `/**
 * ⚠️ auto-generated file - do not edit manually
 * 
 * This file was automatically copied from packages/server
 * using the sync-schemas-with-extension.js script.
 * 
 * To modify this schema, edit the source file in packages/server
 * and run: pnpm run sync:schemas
*/

`;

const processedFiles = new Set();

console.log("🔄 Starting schema synchronization...\n");

// Create schemas directory if it doesn't exist
if (!fs.existsSync(EXTENSION_SCHEMAS_PATH)) {
  fs.mkdirSync(EXTENSION_SCHEMAS_PATH, { recursive: true });
  console.log("✅ Created schemas directory\n");
}

/**
 * Convert schema name to type name
 * Example: dictionaryEntryTypeSchema -> DictionaryEntryType
 */
function schemaNameToTypeName(schemaName) {
  // Remove 'Schema' suffix if exists
  const withoutSchema = schemaName.replace(/Schema$/, "");

  // Convert camelCase to PascalCase
  return withoutSchema.charAt(0).toUpperCase() + withoutSchema.slice(1);
}

/**
 * Extract all exported schema names from content
 */
function extractSchemaNames(content) {
  const schemaNames = [];
  const regex = /export const (\w+Schema)\s*=/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    schemaNames.push(match[1]);
  }

  return schemaNames;
}

/**
 * Generate type exports for schemas
 */
function generateTypeExports(schemaNames, existingContent) {
  if (schemaNames.length === 0) return "";

  const typeExports = schemaNames
    .map((schemaName) => {
      const typeName = schemaNameToTypeName(schemaName);
      const typeExport = `export type ${typeName} = z.infer<typeof ${schemaName}>;`;

      // Check if type already exists in content
      const typeRegex = new RegExp(`export type ${typeName}\\s*=`, "g");
      if (typeRegex.test(existingContent)) {
        console.log(`⏭️ Type ${typeName} already exists, skipping`);
        return null;
      }

      return typeExport;
    })
    .filter(Boolean) // Remove nulls
    .join("\n");

  return typeExports ? "\n" + typeExports + "\n" : "";
}

function ensureZodImport(content) {
  // Check if zod import exists (both variants)
  const hasNamedImport = /import\s+{[^}]*z[^}]*}\s+from\s+['"]zod['"]/.test(
    content,
  );
  const hasDefaultImport = /import\s+z\s+from\s+['"]zod['"]/.test(content);
  const hasNamespaceImport = /import\s+\*\s+as\s+z\s+from\s+['"]zod['"]/.test(
    content,
  );

  if (hasNamedImport || hasDefaultImport || hasNamespaceImport) {
    return content;
  }

  console.log(`📦 Adding zod import`);

  // Add import after first line (or at the beginning)
  const lines = content.split("\n");
  lines.unshift(`import { z } from 'zod';`);

  return lines.join("\n");
}

/**
 * Process a single schema file and its dependencies
 */
function processSchemaFile(filePath) {
  const fileName = path.basename(filePath);

  // Skip if already processed
  if (processedFiles.has(fileName)) {
    return;
  }

  console.log(`📄 Processing: ${fileName}`);
  processedFiles.add(fileName);

  // Read file content
  let content = fs.readFileSync(filePath, "utf8");

  // Find local schema imports (e.g., ./dictionary-example.schema)
  const localSchemaImports = content.matchAll(
    /from ['"]\.\/([\w-]+\.schema)['"]/g,
  );

  for (const match of localSchemaImports) {
    const dependencyFileName = match[1] + ".ts";
    const dependencyPath = path.join(
      path.dirname(filePath),
      dependencyFileName,
    );

    // Check if dependency file exists
    if (fs.existsSync(dependencyPath)) {
      console.log(`Found local dependency: ${dependencyFileName}`);
      // Recursively process dependency
      processSchemaFile(dependencyPath);
    }
  }

  // Find relative path imports (e.g., ./../../audio-records/schemas/audio-record.schema)
  const relativeSchemaImports = content.matchAll(
    /from ['"](\.[\.\/]+.*\/([\w-]+\.schema))['"]/g,
  );

  for (const match of relativeSchemaImports) {
    const relativeImportPath = match[1];
    const dependencyFileName = match[2] + ".ts";

    // Resolve absolute path based on current file's directory
    const currentFileDir = path.dirname(filePath);
    const absoluteDependencyPath = path.resolve(
      currentFileDir,
      relativeImportPath + ".ts",
    );

    // Check if dependency file exists
    if (fs.existsSync(absoluteDependencyPath)) {
      console.log(`Found relative dependency: ${dependencyFileName}`);
      // Recursively process dependency
      processSchemaFile(absoluteDependencyPath);
    }
  }

  // Replace alias imports (@/...) with relative paths
  content = content.replace(
    /from ['"]@\/[^'"]+\/([^'"]+\.response\.schema)['"]/g,
    "from './$1'",
  );

  // Replace relative path imports (../../...) with local imports (./)
  content = content.replace(
    /from ['"](\.[\.\/]+.*\/([\w-]+\.schema))['"]/g,
    "from './$2'",
  );

  // Extract schema names and generate type exports
  const schemaNames = extractSchemaNames(content);
  const typeExports = generateTypeExports(schemaNames, content);

  if (typeExports.trim()) {
    content = ensureZodImport(content);
  }

  if (schemaNames.length > 0) {
    console.log(
      `📝 Generated types: ${schemaNames.map(schemaNameToTypeName).join(", ")}`,
    );
  }

  // Add type exports at the end
  content = content + typeExports;

  // Add auto-generated header
  content = FILE_HEADER + content;

  // Target path in extension
  const targetPath = path.join(EXTENSION_SCHEMAS_PATH, fileName);

  // Remove file if exists
  if (fs.existsSync(targetPath)) {
    fs.unlinkSync(targetPath);
  }

  // Write new file
  fs.writeFileSync(targetPath, content, "utf8");
}

// Find all *.response.schema.ts files as entry points
const responseSchemaFiles = glob.sync("**/*.response.schema.ts", {
  cwd: SERVER_PATH,
  absolute: true,
});

console.log(`📁 Found ${responseSchemaFiles.length} response schema file(s)\n`);

// Process each response schema file and its dependencies
responseSchemaFiles.forEach((filePath) => {
  processSchemaFile(filePath);
});

console.log(
  `\n✅ Successfully synchronized ${processedFiles.size} schema file(s) to extension/src/schemas/\n`,
);
