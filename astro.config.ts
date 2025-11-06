import { defineConfig, envField } from "astro/config";
import clerk from "@clerk/astro";
import remarkObsidian from "remark-obsidian";
import pagefind from "astro-pagefind";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://nathan-smith.org",

  env: {
    schema: {
      PUBLIC_COMMENT_SERVER: envField.string({
        context: "client",
        access: "public",
      }),
    },
  },

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

  integrations: [pagefind(), clerk(), react()],

  vite: {
    plugins: [tailwindcss()],
  },
});
