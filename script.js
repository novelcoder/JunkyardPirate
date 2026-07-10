const books = [
  { num: 1, title: 'Junkyard Pirate', tagline: "Knocking at death's door. Bargaining for a second chance. Seems like a heck of a way to find out about an alien invasion.", blurb: "Vietnam vet Albert Jenkins is battling a bulging waistline and a passion for drink. So when a towering pile of scrap rocket parts falls and crushes the stubborn curmudgeon, he thinks it's finally the end. But just as he's about to take one final breath...", cover: 'https://sfo.cloud.appwrite.io/v1/storage/buckets/6a50ff920031640f71bd/files/6a510087040ed2c6f583/view?project=6a0b4638002a71c2b8ec', amazon: 'https://fickledragon.com/junkyard-amazon', audible: 'https://www.audible.com/pd/Junkyard-Pirate-Audiobook/B083B9K85Z' },
  { num: 2, title: 'Old Dogs, Older Tricks', tagline: "Knocking at death's door. Bargaining for a second chance. Seems like a heck of a way to find out about an alien invasion.", blurb: "Albert Jenkins never cared much for bureaucrats and politicians. So when the Galactic Congress refuses to act on the illegal invasion of Earth by parasitic aliens, he does what any self-respecting vet would do — he steals a spaceship...", cover: 'https://sfo.cloud.appwrite.io/v1/storage/buckets/6a50ff920031640f71bd/files/6a51014e6b0ff2e9acef/view?project=6a0b4638002a71c2b8ec', amazon: 'https://fickledragon.com/olddogs-amazon', audible: 'https://www.audible.com/pd/Old-Dogs-Older-Tricks-Audiobook/B089B1X25L' },
  { num: 3, title: 'Junkyard Spaceship', tagline: 'When aliens threaten his country one grumpy old vet will take the fight to the stars.', blurb: "Albert Jenkins would like nothing more than to putter around his junkyard, selling parts and working on old cars. When an alien spacecraft is shot down...", cover: 'https://sfo.cloud.appwrite.io/v1/storage/buckets/6a50ff920031640f71bd/files/6a510161c0f673bee294/view?project=6a0b4638002a71c2b8ec', amazon: 'https://fickledragon.com/junkyard-spaceship-amazon', audible: 'https://www.audible.com/pd/Junkyard-Spaceship-Audiobook/B08TBR4QF5' },
  { num: 4, title: 'Junkyard Veterans', tagline: "With a price on their heads, grumpy old vets will risk everything to bring alien assassins to justice.", blurb: "Someone is killing off the old team of vets who repelled Earth's first Korgul invasion. With the end of a war precious few even knew was happening, life's been peaceful...", cover: 'https://sfo.cloud.appwrite.io/v1/storage/buckets/6a50ff920031640f71bd/files/6a510166d9b69de2c76c/view?project=6a0b4638002a71c2b8ec', amazon: 'https://fickledragon.com/veterans-amazon', audible: 'https://www.audible.com/pd/B096Y8V9QY' },
  { num: 5, title: 'Junkyard Raiders', tagline: "Dumped on a backwater planet, heroic old vets will risk everything to take a stand against vicious alien invaders.", blurb: "On the pastoral, backwater planet of Fimil Alpha, something or someone is eradicating...", cover: 'https://sfo.cloud.appwrite.io/v1/storage/buckets/6a50ff920031640f71bd/files/6a51016c0d6be803544a/view?project=6a0b4638002a71c2b8ec', amazon: 'https://fickledragon.com/junkyard-raiders-amazon', audible: 'https://www.audible.com/pd/Junkyard-Raiders-Audiobook/B09N9YRTXG' },
  { num: 6, title: 'Junkyard Ghost Ship', tagline: "A flying saucer's crash landing is just the beginning of a race against time to save innocent aliens from a devious plot.", blurb: "Albert Jenkins and his friends have enjoyed several months of peace...", cover: 'https://sfo.cloud.appwrite.io/v1/storage/buckets/6a50ff920031640f71bd/files/6a5101708d6e5b37d1c6/view?project=6a0b4638002a71c2b8ec', amazon: 'https://fickledragon.com/ghostship-amazon', audible: 'https://www.audible.com/pd/Junkyard-Ghost-Ship-Audiobook/B0B4PRDF4D' },
  { num: 7, title: 'Junkyard Commandos', tagline: "A team of grumpy old vets answer the call to war and undertake an impossible rescue when a secret mission, deep in hostile alien territory, goes terribly wrong.", blurb: "The US Army's Zebra Company has been tasked with an impossible, secret mission to establish a presence on planet Fimil Prime...", cover: 'https://sfo.cloud.appwrite.io/v1/storage/buckets/6a50ff920031640f71bd/files/6a510174a8b3ca60ae8b/view?project=6a0b4638002a71c2b8ec', amazon: 'https://fickledragon.com/commandos-amazon', audible: 'https://www.audible.com/pd/Junkyard-Commandos-Audiobook/B0CM3ZKGNN' },
  { num: 8, title: 'Junkyard Mercenary', tagline: 'In a galaxy on the brink, old soldiers never fade away—they just get tougher!', blurb: "Vietnam vet Albert Jenkins faces one of his most dangerous missions yet. When a high-ranking Galactic Empire diplomat named Cer vanishes...", cover: 'https://sfo.cloud.appwrite.io/v1/storage/buckets/6a50ff920031640f71bd/files/6a510178e2be3e4cd57a/view?project=6a0b4638002a71c2b8ec', amazon: 'https://fickledragon.com/mercenary-amazon', audible: 'https://www.audible.com/pd/Junkyard-Mercenary-Audiobook/B0DHDD714R' },
  { num: 9, title: 'Junkyard Saboteur', tagline: 'A covert weapons test. A sabotaged mission. A spy wearing the face of a lover.', blurb: "When the Iron Syndicate seizes control of a remote mining colony, AJ is sent in with his elite strike team to stabilize the situation. But when the mission goes sideways...", cover: 'https://sfo.cloud.appwrite.io/v1/storage/buckets/6a50ff920031640f71bd/files/6a510186ed2085743b69/view?project=6a0b4638002a71c2b8ec', amazon: 'https://fickledragon.com/saboteur-amazon', audible: 'https://www.audible.com/pd/Junkyard-Saboteur-Audiobook/B0FB9P23NF' },
];

function renderBooks(list) {
  const container = document.getElementById('books-list');
  container.innerHTML = list.map((book) => `
    <div style="display:grid;grid-template-columns:180px 1fr;gap:36px;padding:32px 0;border-bottom:1px solid rgba(255,255,255,0.07);">
      <a href="${book.amazon}" style="display:block;">
        <img src="${book.cover}" alt="${book.title}" style="width:100%;border-radius:3px;box-shadow:0 12px 30px rgba(0,0,0,0.45);display:block;">
      </a>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-family:Oswald,sans-serif;color:#e8763c;font-weight:700;font-size:13px;letter-spacing:0.08em;">BOOK ${book.num}</span>
        </div>
        <h3 style="font-family:Oswald,sans-serif;font-size:26px;font-weight:600;margin:0;letter-spacing:0.01em;">${book.title}</h3>
        <p style="color:#8a8477;font-size:14px;font-style:italic;margin:0;line-height:1.5;">${book.tagline}</p>
        <p style="color:#c9c3b8;font-size:15px;line-height:1.65;margin:6px 0 6px;max-width:640px;">${book.blurb}</p>
        <div style="display:flex;gap:12px;margin-top:6px;flex-wrap:wrap;">
          <a href="${book.amazon}" style="background:#e8763c;color:#171512;padding:10px 20px;font-weight:700;font-size:13px;border-radius:4px;">Read on Amazon</a>
          ${book.audible ? `<a href="${book.audible}" style="border:1px solid #5c574d;color:#eeeae2;padding:10px 20px;font-weight:600;font-size:13px;border-radius:4px;">Listen on Audible</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  const thanks = document.getElementById('newsletter-thanks');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    thanks.style.display = 'block';
  });
}

renderBooks(books);
initNewsletterForm();
