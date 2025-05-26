import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export async function getAllPosts(): Promise<CollectionEntry<"blog">[]> {
  const allBlogPosts = await getCollection("blog");

  return allBlogPosts;
}

export async function getPostByCategory(
  category: string,
): Promise<CollectionEntry<"blog">[]> {
  return getAllPosts().then((posts) =>
    posts.filter((post) => post.data.categories.includes(category)),
  );
}

export function sortPostsByDate(
  posts: CollectionEntry<"blog">[],
): CollectionEntry<"blog">[] {
  return [...posts].sort(
    (a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) =>
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
  );
}
