import { defineConfig } from "unocss"
import presetWind from "@unocss/preset-wind"

export default defineConfig({
  presets: [presetWind()],
  rules: [
    ["bg-background", { "background-color": "hsl(var(--background))" }],
    ["bg-accent", { "background-color": "hsl(var(--accent))" }],
    ["bg-primary", { "background-color": "hsl(var(--primary))" }],
    [
      /^bg-primary\/(\d+)$/,
      (match) => ({ "background-color": `hsl(var(--primary) / ${Number(match[1]) * 0.01})` }),
    ],
    ["bg-muted", { "background-color": "hsl(var(--muted))" }],
    ["text-primary", { color: "hsl(var(--primary))" }],
    ["text-primary-foreground", { color: "hsl(var(--primary-foreground))" }],
    ["text-accent-foreground", { color: "hsl(var(--accent-foreground))" }],
    [
      /^text-accent-foreground\/(\d+)$/,
      (match) => ({ color: `hsl(var(--accent-foreground) / ${Number(match[1]) * 0.01})` }),
    ],
    ["text-muted", { color: "hsl(var(--muted))" }],
    ["text-muted-foreground", { color: "hsl(var(--muted-foreground))" }],
    [
      /^text-muted-foreground\/(\d+)$/,
      (match) => ({ color: `hsl(var(--muted-foreground) / ${Number(match[1]) * 0.01})` }),
    ],
  ],
})
