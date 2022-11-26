// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        dice: resolve(__dirname, "dice.html"),
        treasure: resolve(__dirname, "treasure.html"),
      },
    },
  },
});
