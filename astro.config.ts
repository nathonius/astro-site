import { defineConfig } from "astro/config";

import remarkObsidian from "remark-obsidian";
import pagefind from "astro-pagefind";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://nathan-smith.org",

  server: {
    port: 4200,
  },

  redirects: {
    "/til": "/tagged/til",
  },

  markdown: {
    shikiConfig: {
      transformers: [
        {
          pre: function (el) {
            // Add data-file="<filename>" ; note this is probably unstable
            const filenameMeta = this.options.meta?.__raw ?? "";
            if (
              filenameMeta &&
              filenameMeta.startsWith("; ") &&
              filenameMeta.length > 2
            ) {
              const filename = filenameMeta.slice(2);
              el.properties.dataFile = filename;
            }
          },
        },
      ],
    },
    remarkPlugins: [remarkObsidian],
  },

  integrations: [pagefind()],

  vite: {
    plugins: [tailwindcss()],
  },
});