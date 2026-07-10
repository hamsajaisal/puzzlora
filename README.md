# 🧩 Puzzlora — Math Puzzles for Students

A progressive web app (PWA) with fun math puzzles for three levels:

| Category | Puzzles |
|---|---|
| 🐣 **Std 1–4** | What Comes Next? · Magic Square · Balance the Scale · Speedy Sums · Mirror Magic (drawing) |
| 🚀 **Std 5–7** | Magic Square · Number Cross · Broken Calculator · Fraction Face-Off · Dot-to-Dot Detective |
| 🧠 **Std 8–10** | Magic Square 4×4 · Emoji Algebra · Number Tower · Prime Path · Angle Artist (drawing) |

Every puzzle is **randomly generated** on each round and **guaranteed to have exactly
one correct answer** (puzzles are built backwards from a full solution, then blanks are
removed only while the puzzle stays solvable by pure step-by-step deduction).

## Files

- `index.html` — the whole app (HTML + CSS + JS in one file)
- `manifest.json` — makes the app installable on phones
- `sw.js` — service worker for offline play
- `icon-192.png`, `icon-512.png` — app icons

## 🚀 Deploy on GitHub Pages

1. Create a new repository on GitHub (e.g. `puzzlora`).
2. Upload all 5 files to the repository root (drag & drop works on github.com → *Add file → Upload files*).
3. Go to **Settings → Pages**.
4. Under *Source*, choose **Deploy from a branch**, branch **main**, folder **/ (root)**. Save.
5. Wait 1–2 minutes. Your app is live at
   `https://<your-username>.github.io/puzzlora/`

Since GitHub Pages serves over HTTPS, the service worker activates automatically —
after the first visit the app works **offline**, and on phones the browser will offer
**"Add to Home Screen"** to install it like a real app.

## 🛠 Adding more puzzles later

Each puzzle in `index.html` is a small self-contained function that returns
`{id, emoji, name, desc, how, mount(area)}` and is pushed into `PUZZLES.lp / .up / .hs`.
Copy an existing one as a template, write your generator, and push it into a category —
it appears in the menu automatically.
