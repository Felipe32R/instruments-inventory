import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      app: path.resolve(__dirname, "src/app"),
      pages: path.resolve(__dirname, "src/pages"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
