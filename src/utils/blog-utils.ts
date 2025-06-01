import type { CollectionEntry } from "astro:content";
import { getCollection, getEntries, getEntry } from "astro:content";

// Group blog posts by subcategory and sort by order field
export async function getPostsGroupedBySubCategory(categoryId: string): Promise<
  {
    subCategory: CollectionEntry<"subCategory">;
    posts: CollectionEntry<"blog">[];
  }[]
> {
  const category = await getEntry("category", categoryId);

  if (!category) {
    return [];
  }

  // Get all posts by category
  const postsByCategory = await getCollection("blog", ({ data }) => {
    return data.category.id === categoryId;
  });

  // Get all subcategories under this category
  const categorySubCategories = await getEntries(category.data.subCategories);

  // Sort subcategories by order field
  const sortedSubCategories = categorySubCategories.sort(
    (a, b) => a.data.order - b.data.order,
  );

  // Get corresponding blog posts for each subcategory and sort by order field
  const result = sortedSubCategories.map((subCategory) => {
    const posts = postsByCategory
      .filter((post) => post.data.subCategory.id === subCategory.id)
      .sort((a, b) => a.data.order - b.data.order);

    return {
      subCategory,
      posts,
    };
  });

  return result;
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

// tag
export async function getAllTags(): Promise<CollectionEntry<"tag">[]> {
  const allTags = await getCollection("tag");

  return allTags;
}

// Get tag titles from a post's tags for keywords generation
export async function getTagTitles(
  tagReferences: Array<{ id: string; collection: "tag" }>,
): Promise<string[]> {
  if (!tagReferences || tagReferences.length === 0) {
    return [];
  }
  const tagEntries = await getEntries(tagReferences);
  return tagEntries.map((tag) => tag.data.title);
}
