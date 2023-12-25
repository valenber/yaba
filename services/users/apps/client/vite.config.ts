import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export const baseUrl = process.env.NODE_ENV === "production" ? "/users/" : "";

export default defineConfig({
  plugins: [react()],
  base: baseUrl,
  server: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3000", // local Nest api
        changeOrigin: true,
      },
    },
  },
});
