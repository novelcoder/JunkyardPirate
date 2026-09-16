import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBooks, type BookDoc } from "@/lib/appwrite";
import { bookSlug } from "@/lib/slug";

const SITE_URL = "https://junkyardpirate.com";

type Props = {
  params: Promise<{ slug: string }>;
};

async function findBook(slug: string): Promise<BookDoc | null> {
  const books = await getBooks().catch(() => []);
  return books.find((book) => bookSlug(book) === slug) ?? null;
}

export async function generateStaticParams() {
  const books = await getBooks().catch(() => []);
  return books.map((book) => ({ slug: bookSlug(book) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = await findBook(slug);
  if (!book) return {};

  const description = (book.blurb ?? "").slice(0, 300);
  const title = `${book.title} — Junkyard Pirate Book ${book.series_number} | Jamie McFarlane`;
  const url = `${SITE_URL}/books/${slug}/`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "book",
      title,
      description,
      url,
      images: book.cover_url ? [book.cover_url] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: book.cover_url ? [book.cover_url] : undefined,
    },
  };
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const book = await findBook(slug);
  if (!book) notFound();

  return (
    <div className="page">
      <div className="nav">
        <Link href="/" className="nav-brand">
          JAMIE McFARLANE
        </Link>
        <div className="nav-links">
          <Link href="/#books">Books</Link>
          <Link href="/#about">About</Link>
          <Link href="/#newsletter">Newsletter</Link>
        </div>
      </div>

      <div className="book-detail">
        <a href={book.store_url} className="book-detail-cover">
          <img src={book.cover_url} alt={book.cover_alt || book.title} />
        </a>
        <div>
          <div className="hero-badge">Book {book.series_number} of 9</div>
          <h1 className="book-detail-title">{book.title}</h1>
          <p className="book-tagline">{book.tagline}</p>
          <p className="book-detail-blurb">{book.blurb}</p>
          <div className="book-actions">
            <a href={book.store_url} className="btn-buy book-detail-buy">
              {book.store_label || "Read on Amazon"}
            </a>
            {book.audible_url && (
              <a href={book.audible_url} className="btn-audible book-detail-audible">
                Listen on Audible
              </a>
            )}
          </div>
          <p className="book-detail-back">
            <Link href="/#books">&larr; Back to the full series</Link>
          </p>
        </div>
      </div>

      <div className="footer">
        <div>&copy; 2026 Jamie McFarlane</div>
        <div className="footer-links">
          <a href="https://www.facebook.com/jamiemcfarlaneauthor/">Facebook</a>
          <a href="https://twitter.com/mcfarlaneauthor/">Twitter</a>
        </div>
      </div>
    </div>
  );
}
