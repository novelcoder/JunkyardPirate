const APPWRITE_ENDPOINT = 'https://sfo.cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = '6a0b4638002a71c2b8ec';
const APPWRITE_DATABASE_ID = '6a0b628900008b8506e3';
const APPWRITE_BOOKS_COLLECTION_ID = 'books';
const JUNKYARD_PIRATE_SERIES_ID = '6a504cfb00223d37fdf3';

async function fetchBooks() {
  const queries = [
    { method: 'equal', attribute: 'series_id', values: [JUNKYARD_PIRATE_SERIES_ID] },
    { method: 'orderAsc', attribute: 'series_number' },
  ].map((q) => `queries[]=${encodeURIComponent(JSON.stringify(q))}`).join('&');

  const url = `${APPWRITE_ENDPOINT}/databases/${APPWRITE_DATABASE_ID}/collections/${APPWRITE_BOOKS_COLLECTION_ID}/documents?${queries}`;
  const res = await fetch(url, { headers: { 'X-Appwrite-Project': APPWRITE_PROJECT_ID } });
  if (!res.ok) throw new Error(`Failed to load books (${res.status})`);
  const data = await res.json();
  return data.documents;
}

function renderBooks(list) {
  const container = document.getElementById('books-list');
  container.innerHTML = list.map((book) => `
    <div style="display:grid;grid-template-columns:180px 1fr;gap:36px;padding:32px 0;border-bottom:1px solid rgba(255,255,255,0.07);">
      <a href="${book.store_url}" style="display:block;">
        <img src="${book.cover_url}" alt="${book.cover_alt || book.title}" style="width:100%;border-radius:3px;box-shadow:0 12px 30px rgba(0,0,0,0.45);display:block;">
      </a>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-family:Oswald,sans-serif;color:#e8763c;font-weight:700;font-size:13px;letter-spacing:0.08em;">BOOK ${book.series_number}</span>
        </div>
        <h3 style="font-family:Oswald,sans-serif;font-size:26px;font-weight:600;margin:0;letter-spacing:0.01em;">${book.title}</h3>
        <p style="color:#8a8477;font-size:14px;font-style:italic;margin:0;line-height:1.5;">${book.tagline}</p>
        <p style="color:#c9c3b8;font-size:15px;line-height:1.65;margin:6px 0 6px;max-width:640px;">${book.blurb}</p>
        <div style="display:flex;gap:12px;margin-top:6px;flex-wrap:wrap;">
          <a href="${book.store_url}" style="background:#e8763c;color:#171512;padding:10px 20px;font-weight:700;font-size:13px;border-radius:4px;">${book.store_label || 'Read on Amazon'}</a>
          ${book.audible_url ? `<a href="${book.audible_url}" style="border:1px solid #5c574d;color:#eeeae2;padding:10px 20px;font-weight:600;font-size:13px;border-radius:4px;">Listen on Audible</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function renderBooksError() {
  const container = document.getElementById('books-list');
  container.innerHTML = '<p style="color:#8a8477;">Unable to load books right now. Please try again later.</p>';
}

async function subscribeEmail(email) {
  const res = await fetch(`${APPWRITE_ENDPOINT}/functions/subscribe/executions`, {
    method: 'POST',
    headers: {
      'X-Appwrite-Project': APPWRITE_PROJECT_ID,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      body: JSON.stringify({ email }),
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    }),
  });
  if (!res.ok) throw new Error(`Execution request failed (${res.status})`);
  const execution = await res.json();
  const result = execution.responseBody ? JSON.parse(execution.responseBody) : null;
  if (!result || !result.ok) throw new Error('Subscription failed');
}

function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('newsletter-email');
  const thanks = document.getElementById('newsletter-thanks');
  const errorEl = document.getElementById('newsletter-error');
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    thanks.style.display = 'none';
    errorEl.style.display = 'none';
    submitButton.disabled = true;
    try {
      await subscribeEmail(emailInput.value);
      thanks.style.display = 'block';
      form.reset();
    } catch (err) {
      console.error(err);
      errorEl.style.display = 'block';
    } finally {
      submitButton.disabled = false;
    }
  });
}

fetchBooks().then(renderBooks).catch((err) => {
  console.error(err);
  renderBooksError();
});
initNewsletterForm();
