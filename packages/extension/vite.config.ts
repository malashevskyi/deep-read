import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./public/manifest.json";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // Ensures that asset paths are relative, which is required for
  // `chrome.runtime.getURL` to work correctly in content scripts.
  base: "",
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    crx({ manifest }),
    tailwindcss(),
  ],
});
