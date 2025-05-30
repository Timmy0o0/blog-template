import { file, glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      category: reference("category"),
      subCategory: reference("subCategory"),
      tags: z.array(reference("tag")),
      cover: image(),
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date(),
      relatedPosts: z.array(reference("blog")).optional(),
    }),
});

const category = defineCollection({
  loader: file("./src/content/category.yaml"),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      order: z.number(),
      cover: image(),
      name: z.string(),
      subCategories: z.array(reference("subCategory")),
    }),
});

const subCategory = defineCollection({
  loader: file("./src/content/subcategory.yaml"),
  schema: z.object({
    id: z.string(),
    order: z.number(),
    name: z.string(),
  }),
});

const tag = defineCollection({
  loader: file("./src/content/tag.yaml"),
  schema: z.object({
    id: z.string(),
    order: z.number(),
    name: z.string(),
  }),
});

export const collections = { blog, category, subCategory, tag };
