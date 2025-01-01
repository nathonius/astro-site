import { defineConfig } from "astro/config";

import remarkObsidian from "remark-obsidian";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: "https://nathan-smith.org",
  server: {
    port: 4200,
  },
  markdown: {
    shikiConfig: {
      transformers: [
        {
          pre: function () {
            // Add data-file="<filename>" ; note this is probably unstable
            const filenameMeta = this.options.meta?.__raw ?? "";
            if (
              filenameMeta &&
              filenameMeta.startsWith("; ") &&
              filenameMeta.length > 2
            ) {
              const filename = filenameMeta.slice(2);
              this.pre.properties.dataFile = filename;
            }
          },
        },
      ],
    },
    remarkPlugins: [remarkObsidian],
  },
  integrations: [
    pagefind(),
    preact(),
    tailwind({ configFile: "tailwind.config.ts", applyBaseStyles: false }),
  ],
});
