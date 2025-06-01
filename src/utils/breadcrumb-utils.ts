import { USER_SITE } from "@config";

export interface BreadcrumbItem {
  label: string;
  href: string;
  isLast: boolean;
}

/**
 * Generate JSON-LD schema for breadcrumbs
 * @param breadcrumbs Array of breadcrumb items
 * @returns JSON-LD schema object
 */
export function generateBreadcrumbJsonLd(breadcrumbs: BreadcrumbItem[]) {
  // Always include Home as the first breadcrumb
  const allBreadcrumbs = [
    { label: "Home", href: "/", isLast: false },
    ...breadcrumbs,
  ];

  const jsonLdSchema = {
    "@type": "BreadcrumbList",
    itemListElement: allBreadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: {
        "@type": "WebPage",
        "@id": `${USER_SITE}${item.href}`,
        url: `${USER_SITE}${item.href}`,
        name: item.label,
      },
    })),
  };

  // Print the generated JSON-LD schema
  //   console.log(
  //     "Generated Breadcrumb JSON-LD Schema:",
  //     JSON.stringify(jsonLdSchema, null, 2),
  //   );

  return jsonLdSchema;
}

/**
 * Generate breadcrumbs for category pages
 * @param categoryId Category ID
 * @param categoryName Category name
 * @returns Array of breadcrumb items
 */
export function generateCategoryBreadcrumbs(
  categoryId: string,
  categoryName: string,
): BreadcrumbItem[] {
  return [
    {
      label: categoryName,
      href: `/${categoryId}`,
      isLast: true,
    },
  ];
}

/**
 * Generate breadcrumbs for blog post pages
 * @param categoryId Category ID
 * @param categoryName Category name
 * @param postId Post ID
 * @param postTitle Post title
 * @returns Array of breadcrumb items
 */
export function generatePostBreadcrumbs(
  categoryId: string,
  categoryName: string,
  postId: string,
  postTitle: string,
): BreadcrumbItem[] {
  return [
    {
      label: categoryName,
      href: `/${categoryId}`,
      isLast: false,
    },
    {
      label: postTitle,
      href: `/${postId}`,
      isLast: true,
    },
  ];
}
