import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.string().datetime({ offset: true }),
    update_date: z.optional(z.string().datetime({ offset: true })),
    summary: z.string(),
    slug: z.string(),
    tags: z.array(z.string()),
  }),
});

const projects = defineCollection({
  loader: file("src/data/projects.json"),
  schema: z.object({
    id: z.string(),
    tags: z.array(z.string()),
    summary: z.string(),
    githubLink: z.string(),
    projectLink: z.optional(z.string()),
    date: z.string().date(),
    projectStatus: z.enum(["Maintenance", "Active", "Archived"]),
    title: z.string(),
  }),
});

export const collections = { posts, projects };
