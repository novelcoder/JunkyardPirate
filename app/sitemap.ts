import type { MetadataRoute } from "next";
import { getBooks } from "@/lib/appwrite";
import { bookSlug } from "@/lib/slug";

const SITE_URL = "https://junkyardpirate.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const books = await getBooks().catch(() => []);

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...books.map((book) => ({
      url: `${SITE_URL}/books/${bookSlug(book)}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
