import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        // The main entry for the popup UI
        main: resolve(__dirname, "index.html"),
        // The entry for our content script
        content: resolve(__dirname, "src/content.tsx"),
      },
      output: {
        // This ensures the output files have predictable names
        entryFileNames: `src/[name].js`,
        chunkFileNames: `src/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});
