import { defineConfig } from "vite";

export default defineConfig({
  base: "/FactoryGame/",
  server: {
    port: 5173,  // static port (change if you want another)
    strictPort: true // fails instead of picking random
  },
  build: {
    outDir: "dist"
  }
});