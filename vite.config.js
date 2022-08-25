import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_APP_API_URL,
          // target: "http://localhost:5252",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
};
