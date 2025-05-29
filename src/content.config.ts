import { file, glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      cover: image(),
      categories: z.array(reference("categories")),
      tags: z.array(reference("tags")),
    }),
});

const categories = defineCollection({
  loader: file("./src/content/categories.yaml"),
  schema: z.object({
    id: z.string(),
    order: z.number(),
  }),
});

const tags = defineCollection({
  loader: file("./src/content/tags.yaml"),
  schema: z.object({
    id: z.string(),
    order: z.number(),
  }),
});

export const collections = { blog, categories, tags };
