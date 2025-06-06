export interface Metadata {
  title: string;
  description: string;
  image?: string;
  type: "website" | "article";
  robots: "index, follow" | "noindex, nofollow" | "noindex, follow";
}
