import type { CollectionEntry } from "astro:content";

/**
 * Create a unified JSON-LD schema using @graph structure
 * @param schemas Array of schema objects
 * @returns Unified JSON-LD schema object
 */
export function createJsonLdSchema(schemas: any[]) {
  return {
    "@context": "https://schema.org",
    "@graph": schemas,
  };
}

/**
 * Create a WebSite schema for the homepage
 * @param siteTitle Site title
 * @param siteDescription Site description
 * @param siteUrl Site URL
 * @returns WebSite schema object
 */
export function createWebSiteSchema(
  siteTitle: string,
  siteDescription: string,
  siteUrl: string,
) {
  return {
    "@type": ["WebSite", "Blog"],
    url: siteUrl,
    name: siteTitle,
    description: siteDescription,
    publisher: {
      "@type": "Organization",
      name: siteTitle,
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": siteUrl,
    },
  };
}

/**
 * Create a CollectionPage schema for category pages
 * @param categoryUrl Category URL
 * @param categoryName Category name
 * @param categoryDescription Category description
 * @param categoryImage Category image URL
 * @param siteTitle Site title
 * @param siteUrl Site URL
 * @param totalPostCount Total number of posts
 * @param posts Array of posts in the category
 * @returns CollectionPage schema object
 */
export function createCollectionPageSchema(
  categoryUrl: string,
  categoryName: string,
  categoryDescription: string,
  categoryImage: string | undefined,
  siteTitle: string,
  siteUrl: string,
  totalPostCount: number,
  posts: CollectionEntry<"blog">[],
) {
  return {
    "@type": "CollectionPage",
    url: categoryUrl,
    name: categoryName,
    description: categoryDescription,
    image: categoryImage,
    publisher: {
      "@type": "Organization",
      name: siteTitle,
      url: siteUrl,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: totalPostCount,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "BlogPosting",
          headline: post.data.title,
          description: post.data.description,
          url: `${siteUrl}/${post.id}`,
          datePublished: post.data.pubDate?.toISOString(),
          image: `${siteUrl}${post.data.image.src}`,
        },
      })),
    },
  };
}

/**
 * Create a BlogPosting schema for blog post pages
 * @param postUrl Post URL
 * @param postTitle Post title
 * @param postDescription Post description
 * @param postKeywords Post keywords/tags
 * @param postImage Post image URL
 * @param pubDate Published date
 * @param updatedDate Updated date
 * @param siteTitle Site title
 * @param siteUrl Site URL
 * @returns BlogPosting schema object
 */
export function createBlogPostingSchema(
  postUrl: string,
  postTitle: string,
  postDescription: string,
  postKeywords: string[],
  postImage: string | undefined,
  pubDate: Date | undefined,
  updatedDate: Date | undefined,
  siteTitle: string,
  siteUrl: string,
) {
  return {
    "@type": "BlogPosting",
    url: postUrl,
    headline: postTitle,
    description: postDescription,
    keywords: postKeywords,
    image: postImage,
    datePublished: pubDate?.toISOString(),
    dateModified: updatedDate?.toISOString() || pubDate?.toISOString(),
    publisher: {
      "@type": "Organization",
      name: siteTitle,
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };
}
