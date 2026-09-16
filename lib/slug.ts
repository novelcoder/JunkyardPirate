import type { BookDoc } from "@/lib/appwrite";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function bookSlug(book: Pick<BookDoc, "series_number" | "title">): string {
  return `book-${book.series_number}-${slugify(book.title)}`;
}
