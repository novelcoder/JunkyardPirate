import NewsletterForm from "@/components/NewsletterForm";
import { getBooks, type BookDoc } from "@/lib/appwrite";

const HERO_COVER_URL =
  "https://sfo.cloud.appwrite.io/v1/storage/buckets/6a50ff920031640f71bd/files/6a510087040ed2c6f583/view?project=6a0b4638002a71c2b8ec";
const AMAZON_URL = "https://fickledragon.com/junkyard-amazon";

function BookRow({ book }: { book: BookDoc }) {
  return (
    <div className="book-row">
      <a href={book.store_url} className="book-row-cover">
        <img src={book.cover_url} alt={book.cover_alt || book.title} />
      </a>
      <div className="book-info">
        <div>
          <span className="book-eyebrow">BOOK {book.series_number}</span>
        </div>
        <h3 className="book-title">{book.title}</h3>
        <p className="book-tagline">{book.tagline}</p>
        <p className="book-blurb">{book.blurb}</p>
        <div className="book-actions">
          <a href={book.store_url} className="btn-buy">
            {book.store_label || "Read on Amazon"}
          </a>
          {book.audible_url && (
            <a href={book.audible_url} className="btn-audible">
              Listen on Audible
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function HomePage() {
  const books = await getBooks().catch((e) => {
    console.warn("Could not load books from Appwrite:", e.message);
    return null;
  });

  return (
    <div className="page">
      {/* NAV */}
      <div className="nav">
        <div className="nav-brand">JAMIE McFARLANE</div>
        <div className="nav-links">
          <a href="#books">Books</a>
          <a href="#about">About</a>
          <a href="#newsletter">Newsletter</a>
        </div>
      </div>

      {/* HERO */}
      <div className="hero">
        <div>
          <div className="hero-badge">9-Book Series</div>
          <h1 className="hero-title">
            JUNKYARD
            <br />
            <span className="accent">PIRATE</span>
          </h1>
          <p className="hero-copy">
            Knocking at death&rsquo;s door. Bargaining for a second chance. Seems like a heck of a
            way for a grumpy old Vietnam vet to find out about an alien invasion&nbsp;&hellip;
          </p>
          <div className="hero-ctas">
            <a href={AMAZON_URL} className="btn-primary">
              Start Book 1 on Amazon
            </a>
            <a href="#books" className="btn-secondary">
              See All 9 Books
            </a>
          </div>
        </div>
        <div className="hero-cover-col">
          <a href={AMAZON_URL} className="hero-cover">
            <img src={HERO_COVER_URL} alt="Junkyard Pirate cover" />
          </a>
        </div>
      </div>

      {/* BOOKS */}
      <div id="books" className="books-section">
        <div className="books-header">
          <h2>The Series</h2>
          <span>Vietnam vet Albert Jenkins vs. the galaxy</span>
        </div>

        <div id="books-list">
          {books === null ? (
            <p className="books-empty">Unable to load books right now. Please try again later.</p>
          ) : (
            books.map((book) => <BookRow key={book.$id} book={book} />)
          )}
        </div>
      </div>

      {/* ABOUT */}
      <div id="about" className="about-section">
        <div className="about-inner">
          <h2>About Jamie McFarlane</h2>
          <p>
            Jamie McFarlane writes military science fiction full of scrappy underdogs, salvaged
            spaceships, and grumpy old veterans who refuse to stay retired. The Junkyard Pirate
            series follows Albert Jenkins from a Wisconsin junkyard to the front lines of a
            galactic war &mdash; proving old dogs can still learn (and teach) a few new tricks.
          </p>
        </div>
      </div>

      {/* NEWSLETTER */}
      <div id="newsletter" className="newsletter-section">
        <div className="newsletter-inner">
          <h2>Never Miss a Launch</h2>
          <p>Get new releases and behind-the-scenes news from Jamie McFarlane.</p>
          <NewsletterForm />
        </div>
      </div>

      {/* FOOTER */}
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
