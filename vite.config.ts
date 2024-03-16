import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // 解决跨域
    proxy: {
      "/api": {
        target: "http://39.98.110.164:8080",
        changeOrigin: true,
      },
      "/cos": {
        target: "https://yizhesite-1317876382.cos.ap-beijing.myqcloud.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cos/, ""),
      },
      "/devapi": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/devapi/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
