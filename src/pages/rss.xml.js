import rss from "@astrojs/rss";
import { SITE_HERO_DESCRIPTION, SITE_TAB } from "@config";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("blog");

  const items = posts.map((post) => ({
    title: post.data.title,
    pubDate: post.data.pubDate,
    description: post.data.description,
    link: `/${post.id}`,
  }));

  return rss({
    title: SITE_TAB,
    description: SITE_HERO_DESCRIPTION,
    site: context.site,
    items: items,
  });
}
