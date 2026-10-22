import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Phiên Dịch Nhanh",
        short_name: "Phiên Dịch",
        description: "Sổ tay phiên dịch du lịch offline",
        theme_color: "#0f766e",
        background_color: "#f5f7f8",
        display: "standalone",
        start_url: "/phiendichnhanh/",
        scope: "/phiendichnhanh/",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json,woff2}"],
      },
    }),
  ],
  base: "/phiendichnhanh/",
});
