import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export async function getAllPosts(): Promise<CollectionEntry<"blog">[]> {
  const allBlogPosts = await getCollection("blog");

  return allBlogPosts;
}

// blog
export async function getPostByCategory(
  category: string,
): Promise<CollectionEntry<"blog">[]> {
  return getAllPosts().then((posts) =>
    posts.filter((post) => post.data.category.id === category),
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

export function sortPostsByOrder(
  posts: CollectionEntry<"blog">[],
): CollectionEntry<"blog">[] {
  return [...posts].sort(
    (a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) =>
      a.data.order - b.data.order,
  );
}

// category
export async function getAllCategories(): Promise<
  CollectionEntry<"category">[]
> {
  const allCategories = await getCollection("category");

  return allCategories;
}

// tags
export async function getAllTags(): Promise<CollectionEntry<"tags">[]> {
  const allTags = await getCollection("tags");

  return allTags;
}
