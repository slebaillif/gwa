# Global Women Ascend website

Static site: plain HTML, CSS and a little JS. No framework.

- Edit page content in `src/<page>.html`, then run `node build.mjs` to regenerate the top-level pages (shared head, header and footer live in `build.mjs`).
- Open `index.html` in a browser to preview, or deploy the folder to any static host (Netlify, Vercel, Cloudflare Pages).

## Before going live

1. **Images** are in `images/` (web-optimised; originals in `../originals/`):
   - `hero.jpg`: yellow-chair portrait, homepage hero
   - `pascale.webp`: Paschalia-152 cutout, homepage founder section and About hero
   - `pascale-2.jpg`: arms-crossed portrait, For Individuals hero
   - `pascale-3.jpg`: gallery portrait, Contact page
2. **Testimonials**: replace the Maria and Annette placeholders in `src/index.html` and `src/about.html` with short outcome lines from their original testimonials.
3. **Enquiry form**: set `data-to` in `src/contact.html` to the real inbox. The form currently opens the visitor's email client; swap the handler in `main.js` for a form backend if preferred.
