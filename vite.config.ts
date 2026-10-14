import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["icon.svg", "icon-192.png", "icon-512.png"],
      manifest: {
        name: "سوق القرنة | Qurnah Market",
        short_name: "سوق القرنة",
        lang: "ar",
        dir: "rtl",
        description: "مول القرنة الإلكتروني — نسخة تجريبية",
        theme_color: "#102b46",
        background_color: "#f7f9fc",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        navigateFallback: "/index.html",
        globPatterns: ["**/*.{js,css,html,svg,png,webp}"],
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) =>
          id.includes("node_modules") && /react|scheduler/.test(id)
            ? "vendor"
            : undefined,
      },
    },
  },
});
