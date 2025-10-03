const { config: dotenvConfig } = require("dotenv");
const { execSync } = require("child_process");
const { join } = require("path");
const { writeFileSync } = require("fs");
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;

function toPascalCase(str) {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

try {
  const envPath = join(__dirname, "..", ".env");
  dotenvConfig({ path: envPath });
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    console.error(`DATABASE_URL not found. Looked for .env at: ${envPath}`);
    process.exit(1);
  }

  const outputPath = join(
    __dirname,
    "..",
    "packages",
    "extension",
    "src",
    "types",
    "database.types.ts",
  );
  const command = `npx supabase@latest gen types typescript --db-url "${dbUrl}"`;

  console.log("Generating Supabase types...");
  const generatedTypes = execSync(command, { encoding: "utf-8" });

  if (!generatedTypes) {
    throw new Error("Supabase CLI returned empty string.");
  }
  console.log("✅ Types generated");

  const ast = parse(generatedTypes, {
    sourceType: "module",
    plugins: ["typescript"],
  });

  let tableNames = [];

  traverse(ast, {
    TSTypeAliasDeclaration(path) {
      if (path.node.id.name === "Database") {
        // Шукаємо Database type alias
        const typeAnnotation = path.node.typeAnnotation;
        if (typeAnnotation.type === "TSTypeLiteral") {
          const publicProp = typeAnnotation.members.find(
            (m) => m.key?.name === "public",
          );

          if (
            publicProp?.typeAnnotation?.typeAnnotation.type === "TSTypeLiteral"
          ) {
            const tablesProp =
              publicProp.typeAnnotation.typeAnnotation.members.find(
                (m) => m.key?.name === "Tables",
              );

            if (
              tablesProp?.typeAnnotation?.typeAnnotation.type ===
              "TSTypeLiteral"
            ) {
              tableNames = tablesProp.typeAnnotation.typeAnnotation.members
                .filter(
                  (m) =>
                    m.type === "TSPropertySignature" &&
                    m.key?.type === "Identifier",
                )
                .map((m) => m.key.name);
            }
          }
        }
      }
    },
    TSInterfaceDeclaration(path) {
      if (path.node.id.name === "Database") {
        // Для старого формату (interface)
        const publicProp = path.node.body.body.find(
          (p) => p.key?.name === "public",
        );

        if (
          publicProp?.typeAnnotation?.typeAnnotation.type === "TSTypeLiteral"
        ) {
          const tablesProp =
            publicProp.typeAnnotation.typeAnnotation.members.find(
              (p) => p.key?.name === "Tables",
            );

          if (
            tablesProp?.typeAnnotation?.typeAnnotation.type === "TSTypeLiteral"
          ) {
            tableNames = tablesProp.typeAnnotation.typeAnnotation.members
              .filter(
                (m) =>
                  m.type === "TSPropertySignature" &&
                  m.key?.type === "Identifier",
              )
              .map((m) => m.key.name);
          }
        }
      }
    },
  });

  console.log("Found tables:", tableNames);

  if (tableNames.length === 0) {
    throw new Error("No tables found in public schema!");
  }

  const importStatement = `import type { CamelCase } from "ts-case-convert";\n\n`;
  let additionalTypes = "\n// --- Custom Type Aliases ---\n";

  for (const tableName of tableNames) {
    const typeName = `${toPascalCase(tableName)}Table`;
    additionalTypes += `export type ${typeName} = CamelCase<Tables<"${tableName}">>;\n`;
    additionalTypes += `export type ${typeName}Insert = CamelCase<TablesInsert<"${tableName}">>;\n`;
    additionalTypes += `export type ${typeName}Update = CamelCase<TablesUpdate<"${tableName}">>;\n\n`;
  }

  writeFileSync(outputPath, importStatement + generatedTypes + additionalTypes);
  console.log(`✅ Generated ${tableNames.length} table types`);
  console.log(`✅ Saved to: ${outputPath}`);
} catch (error) {
  console.error("❌ Failed:");
  console.error(error.message || error);
  if (error.stderr) {
    console.error("CLI Error:", error.stderr.toString());
  }
  process.exit(1);
}
