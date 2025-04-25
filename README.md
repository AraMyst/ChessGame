# ♞ Chess Game

Live demo → **https://aramyst.github.io/chessgame/**

An interactive, single-page chess board built with vanilla **JavaScript**, **HTML5** and **CSS Grid**.  
The project follows clean **OOP** principles (`Piece`, `Board`, `Game`) and already implements:

- Turn tracking (white / black)  
- Piece selection and legal-move highlighting  
- Capture tracking (“jail” sidebar)  
- Check / checkmate detection  
- Win dialog and board reset  

---

## 🎮 Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/aramyst/chess.git
cd chess

# 2. Open the game locally
npx serve        # or live-server / VS Code Live Preview / any static server
# then visit http://localhost:3000 (default port may vary)
No build step required. Everything runs in the browser as ES modules.

📂 Project Structure
arduino
chess/
├── index.html      # markup & root node mounts
├── styles.css      # board styling (fully theme-able)
└── script.js       # game logic (ES module, ~250 LOC)
🕹️ How to Play
Click a piece that belongs to whose turn it is.

Legal destination squares are ring-highlighted in gold.

Click a highlighted square to move. Captured pieces appear in the sidebar.

When the opponent is in check, “CHECK!” is shown in the status bar.

Checkmate triggers an alert and reloads the page for a fresh game.

🔧 Tech Stack
Layer	Choice	Notes
Mark-up	HTML5	semantic & accessible
Styling	CSS Grid / Flexbox	no frameworks, perfect for a chess board
Logic	ES 2020 modules	pure JS, zero dependencies
Tooling	GitHub Pages	free static hosting
🚀 Roadmap / Nice-to-Have
Feature	Status
Castling	🔜
En Passant	🔜
Pawn promotion	🔜
Full stalemate / draw rules	🔜
Move history panel (algebraic notation)	🔜
Minimax AI opponent	🔜
Drag-and-drop controls	🔜
Dark-mode & custom themes	🔜
