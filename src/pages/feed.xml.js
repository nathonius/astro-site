import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("posts");
  return rss({
    title: "Nathan Smith dot org",
    description:
      "Writings on cool tech, web development, and occasionally life.",
    site: context.site,
    // See "Generating items" section for examples using content collections and glob imports
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.summary,
      pubDate: p.data.date,
      link: `/posts/${p.data.slug}`,
    })),
    customData: `<language>en</language>`,
  });
}
