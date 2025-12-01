# Memory Matching Game

A classic card matching game built with vanilla JavaScript, HTML5, and CSS3. The game features a responsive grid, 3D card flip animations, a countdown timer, and a move counter to track player performance.

---

## Table of Contents

1. [Features](#-features)
2. [Technologies Used](#-technologies-used)
3. [File Structure](#-file-structure)
4. [How It Works (Technical Logic)](#-how-it-works-technical-logic)
    - [The Shuffling Algorithm](#1-the-shuffling-algorithm)
    - [The 3D Flip Effect](#2-the-3d-flip-effect)
    - [Game State Management](#3-game-state-management)
5. [Future Improvements](#-future-improvements)

---

## Features

* **Interactive Gameplay:** Click cards to flip them and find pairs.
* **3D Animations:** Smooth CSS flip transitions using `transform` and `perspective`.
* **Countdown Timer:** Adds urgency to the game (default: 60 seconds).
* **Move Counter:** Tracks every pair flip attempted.
* **Win/Loss States:** Detects when all pairs are found or when time runs out.
* **Responsive Design:** Uses CSS Grid to adapt to different screen sizes.
* **No Image Assets:** Uses Emojis for card faces, keeping the project lightweight and fast.

---

## Technologies Used

* **HTML5:** Semantic structure for the game board and stats.
* **CSS3:**
  * **Flexbox & Grid:** For layout and alignment.
  * **Transitions & Transforms:** For the card flipping mechanics (`rotateY`).
* **JavaScript (ES6+):** Game logic, DOM manipulation, and state handling.

---


## File Structure

The project is organized into a simple three-file structure to separate concerns:

```
memory-game/
│
├── index.html      # The skeleton (DOM structure and containers)
├── style.css       # The styling (Visuals, Animations, Grid)
└── script.js       # The brain (Game Logic, Event Listeners)
```

---

## How It Works (Technical Logic)

### 1. The Shuffling Algorithm

We use the **Fisher-Yates Shuffle Algorithm** to ensure the cards are in a different random order every time the game starts. This is more efficient and truly random compared to `Math.random() - 0.5`.

```javascript
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
```

### 2. The 3D Flip Effect

The visual "flip" is achieved purely through CSS:

* `perspective: 1000px;` on the container gives depth.
* `transform-style: preserve-3d;` allows the child elements (front/back) to exist in 3D space.
* `backface-visibility: hidden;` ensures that when the card is rotated 180 degrees, the back face is hidden, revealing the front.

### 3. Game State Management

To prevent bugs (like clicking 3 cards at once), the JavaScript maintains specific state variables:

* **lockBoard:** Boolean. If true, ignores clicks. Used when two cards do not match and the game is waiting 1 second to flip them back.
* **hasFlippedCard:** Boolean. Tracks if the user is clicking the first or second card of a turn.
* **firstCard & secondCard:** Stores the DOM elements of the clicked cards to compare their `data-emoji`.

---

## Future Improvements

* Add different difficulty levels with more cards.
* Include sound effects for flips, matches, and win/loss.
* Store high scores using `localStorage`.
* Add a “shuffle again” button without refreshing the page.
```
