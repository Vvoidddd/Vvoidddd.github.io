# .env Generator (Static)

What it does
- Lets you pick a **stack**, **type**, **flow** (preset), and **environment** to assemble a set of environment variables.
- Merges stack/type/environment variables with useful defaults and any custom `KEY=value` pairs you add.
- Renders a ready-to-copy `.env` text using formatting options (quoted, export, uppercase, lowercase, minimize).

How it works now (no server required)
- The client loads `static/config.json` (bundled data for stacks, types, flows, environments).
- `static/app.js` builds the merged variables and renders the `.env` text entirely in-browser.
- The site root `index.html` uses relative `static/...` paths so it is GitHub Pages compatible.

Main files
- `index.html` — root page (GitHub Pages entry)
- `static/app.js` — client logic and generator
- `static/config.json` — data source copied from the original server config