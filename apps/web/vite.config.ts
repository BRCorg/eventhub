import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    // Sous Windows le hot-reload ne marche pas sans ça
    watch: { usePolling: true },
    // Dans Docker, l'API s'appelle "api"
    proxy: { "/api": process.env.API_URL ?? "http://localhost:3000" },
  },
});
