// Builds the static site: wraps each page body in src/ with the shared head, header and footer.
// Usage: node build.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const pages = {
  index: {
    title: 'Global Women Ascend',
    description: 'Practitioner-led leadership programmes, coaching, and behavioural simulations that turn high-performing women into influential senior leaders.',
  },
  corporate: {
    title: 'Corporate Solutions | Global Women Ascend',
    description: 'For HR, Talent, and business leaders whose high-performing women are not translating into influential senior leaders.',
  },
  programmes: {
    title: 'Programmes | Global Women Ascend',
    description: 'Leadership Transition Programme, 1-2-1 Leadership Coaching, and Atlantis, a strategic leadership simulation.',
  },
  individuals: {
    title: 'For Individuals | Global Women Ascend',
    description: '1-2-1 leadership coaching for senior women who are delivering at a high level but not yet seen as leaders.',
  },
  about: {
    title: 'About Pascale Lebaillif | Global Women Ascend',
    description: 'Twenty years inside the rooms where senior decisions are made. Pascale Lebaillif, founder of Global Women Ascend.',
  },
  contact: {
    title: 'Contact | Global Women Ascend',
    description: 'Discuss your leadership pipeline with Global Women Ascend.',
  },
};

const nav = [
  ['corporate', 'Corporate Solutions'],
  ['programmes', 'Programmes'],
  ['individuals', 'For Individuals'],
  ['about', 'About'],
  ['contact', 'Contact'],
];

const head = (p) => `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${p.title}</title>
<meta name="description" content="${p.description}">
<meta property="og:title" content="${p.title}">
<meta property="og:description" content="${p.description}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
<script>document.documentElement.classList.add('js')</script>
</head>
<body>
`;

const header = (slug) => `
<header class="site-header">
  <div class="wrap">
    <a class="brand" href="index.html" aria-label="Global Women Ascend, home">
      <span class="brand__name">Global Women Ascend</span>
      <span class="brand__tag">Leadership Advisory</span>
    </a>
    <button class="nav-toggle" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
    <nav class="nav" aria-label="Main">
${nav.map(([s, label]) => `      <a href="${s}.html"${s === slug ? ' aria-current="page"' : ''}>${label}</a>`).join('\n')}
      <a class="btn" href="contact.html">Discuss your leadership pipeline</a>
    </nav>
  </div>
</header>
`;

const footer = `
<footer class="site-footer">
  <div class="wrap">
    <div>
      <a class="brand" href="index.html"><span class="brand__name">Global Women Ascend</span><span class="brand__tag">Leadership Advisory</span></a>
      <p style="margin-top:22px;max-width:30em">Practitioner-led leadership advisory for organisations turning high-performing women into influential senior leaders. London, UK and Europe.</p>
    </div>
    <div>
      <h5>Work with us</h5>
      <ul>
        <li><a href="corporate.html">Corporate Solutions</a></li>
        <li><a href="programmes.html">Programmes</a></li>
        <li><a href="individuals.html">For Individuals</a></li>
      </ul>
    </div>
    <div>
      <h5>Company</h5>
      <ul>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
    <div class="legal"><span>© 2026 Global Women Ascend</span><span>Pascale Lebaillif</span></div>
  </div>
</footer>

<script src="main.js"></script>
</body>
</html>
`;

for (const [slug, meta] of Object.entries(pages)) {
  const body = readFileSync(new URL(`./src/${slug}.html`, import.meta.url), 'utf8');
  if (body.includes('—')) console.warn(`warning: em dash found in src/${slug}.html`);
  const html = head(meta) + header(slug) + '\n<main>\n' + body.trimEnd() + '\n</main>\n' + footer;
  writeFileSync(new URL(`./${slug}.html`, import.meta.url), html);
  console.log(`built ${slug}.html`);
}
