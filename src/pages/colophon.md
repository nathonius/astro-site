---
title: Colophon
layout: ../layouts/Home.astro
---

# Colophon

You can see the source for this site [on GitHub](https://github.com/nathonius/astro-site). This tools used to create it are described here.

## Tech

- [Astro](https://docs.astro.build/en/getting-started/) is used to generate the static site from layouts, components, and markdown content.
  - I used to use [Eleventy](https://www.11ty.dev/docs/), and you can still see my old Eleventy site [on GitHub](https://github.com/nathonius/11ty-site), but I found it difficult to maintain.
  - I moved to Astro because it has full TypeScript support and most of the things that I wanted built in without having to build myself.
- The site (and all my sites) are hosted on [Cloudflare pages](https://pages.cloudflare.com/).
  - I also use Cloudflare to manage domains, email, etc. I find it useful to have all of my web infrastructure in the same place, and Cloudflare's free offerings are great.
- The site is styled with [Tailwind CSS](https://tailwindcss.com/docs/installation) for base styles and [daisyUI](https://daisyui.com/) for components.

## Tools

- The site is maintained using [Visual Studio Code](https://code.visualstudio.com/), while the source code is stored in a git repo hosted on my GitHub.
- I use [Better Commits](https://github.com/Everduin94/better-commits) to format commits.
- Actual content for the site is written in [Obsidian](https://obsidian.md/), and my previous site was entirely contained within an Obsidian vault.
  - There's great plugins for both the markdown engines used by both [Astro](https://github.com/johackim/remark-obsidian) and [Eleventy](https://github.com/ebullient/markdown-it-obsidian-callouts) for some better compatibility with Obsidian's markdown syntax.