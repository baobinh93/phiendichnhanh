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
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json,woff2}"],
      },
    }),
  ],
  base: "/phiendichnhanh/",
});
