import { file, glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      category: reference("category"),
      tags: z.array(reference("tags")),
      cover: image(),
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date(),
      relatedPosts: z.array(reference("blog")).optional(),
    }),
});

const category = defineCollection({
  loader: file("./src/content/categories.yaml"),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      order: z.number(),
      cover: image(),
      name: z.string(),
    }),
});

const tags = defineCollection({
  loader: file("./src/content/tags.yaml"),
  schema: z.object({
    id: z.string(),
    order: z.number(),
    name: z.string(),
  }),
});

export const collections = { blog, category, tags };
