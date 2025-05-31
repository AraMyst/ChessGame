# ♞ Chess Game

An interactive, single‑page chess board powered by **vanilla JavaScript**, **HTML5**, and **CSS Grid**. Play through a full match in your browser—no accounts, downloads, or frameworks required.

> **Live demo →** [https://aramyst.github.io/ChessGame/](https://aramyst.github.io/ChessGame/)

---

## Features

|                                    |                                                                               |
| ---------------------------------- | ----------------------------------------------------------------------------- |
| 🎯 **Turn tracking**               | Automatically alternates between **white** and **black**.                     |
| ✨ **Legal‑move highlighting**      | Click a piece to see every square it may legally move to—highlighted in gold. |
| ♟️ **Piece capture & jail**        | Captured pieces are displayed in a sidebar ("jail") for each colour.          |
| 🔒 **Check & checkmate detection** | Instantly warns when a king is threatened and ends the game on checkmate.     |
| 🔄 **Board reset on win**          | A win dialog appears and resets the board for a new match.                    |
| 🖥 **Responsive CSS Grid board**   | Clean 8×8 layout that scales gracefully on mobile and desktop.                |
| 💡 **Object‑oriented core**        | `Piece`, `Board`, and `Game` classes keep the codebase tidy and extensible.   |
| 🌐 **Zero dependencies**           | No build tools, libraries, or servers—just open the HTML file.                |

---

## How to Play

1. **Click** a piece that belongs to the player whose turn it is.
2. Legal destination squares are ring‑highlighted in **gold**.
3. **Click** a highlighted square to move. Captured pieces appear in the sidebar.
4. When the opponent is in check, the status bar displays **CHECK!**
5. Checkmate triggers a victory dialog and automatically reloads the page for a fresh game.

*Tip: You can promote a pawn on the last rank by entering `Q`, `R`, `B`, or `N` when prompted.*

---

## Tech Stack

| Layer   | Technology               | Purpose / Notes                                 |
| ------- | ------------------------ | ----------------------------------------------- |
| UI      | **HTML5 & CSS Grid**     | Creates a flexible, responsive 8×8 board.       |
| Styling | **Vanilla CSS**          | Minimal styles; highlights via `outline`.       |
| Logic   | **ES6 JavaScript**       | OOP classes (`Piece`, `Board`, `Game`).         |
| Icons   | **Unicode Chess pieces** | No external assets—crystal‑clear on any screen. |
| Hosting | **GitHub Pages**         | Instant, free static deployment.                |

