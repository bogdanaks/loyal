import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import * as fs from "fs";

export default defineConfig({
  plugins: [react(), svgr(), tsconfigPaths()],
  // server: {
  //   port: 443,
  //   host: "0.0.0.0",
  //   hmr: {
  //     host: "tg-mini-app.local",
  //     port: 443,
  //   },
  //   https: {
  //     key: fs.readFileSync("./.cert/localhost-key.pem"),
  //     cert: fs.readFileSync("./.cert/localhost.pem"),
  //   },
  // },
});
