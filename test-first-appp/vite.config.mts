import { defineConfig } from "vite";
import zaloMiniApp from "zmp-vite-plugin";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    root: "./src",
    base: "",
    plugins: [zaloMiniApp(), react()],
    build: {
      assetsInlineLimit: 0,
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    server: {
      proxy: {
        // Thay đổi endpoint bên dưới cho phù hợp với API thực tế
        "/api": {
          target: "https://api.example.com", // domain của API thật
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, "/products"),
        },
      },
    },
  });
};
