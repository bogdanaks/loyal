import { defineConfig } from "astro/config"
import UnoCSS from "unocss/astro"

export default defineConfig({
  integrations: [
    UnoCSS({
      injectReset: true,
    }),
  ],
  trailingSlash: "never",
  vite: {
    build: {
      rollupOptions: {
        external: ["tailwind.config.js"],
      },
    },
  },
})
