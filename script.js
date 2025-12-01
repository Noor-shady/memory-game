const gameBoard = document.getElementById('game-board');
const movesElement = document.getElementById('moves');
const timeElement = document.getElementById('time');
const gameOverScreen = document.getElementById('game-over');
const gameOverText = document.getElementById('game-over-text');

const emojis = ['🍕', '🍕', '🚀', '🚀', '🐱', '🐱', '🌵', '🌵', '🎸', '🎸', '🍦', '🍦', '💎', '💎', '🎈', '🎈'];

let cards = []; 
let hasFlippedCard = false;
let lockBoard = false; 
let firstCard, secondCard;
let moves = 0;
let matchesFound = 0;
let timeLeft = 60; 
let timerInterval;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize Game
function initGame() {
    const shuffledEmojis = shuffle(emojis);

    shuffledEmojis.forEach(emoji => {
        const card = document.createElement('div');
        card.classList.add('card');
        // Store value to check match later
        card.dataset.emoji = emoji; 

        card.innerHTML = `
            <div class="front-face">${emoji}</div>
            <div class="back-face">?</div>
        `;
        
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    });

    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;

        if (timeLeft === 0) {
            // Time ran out
            endGame(false); 
        }
    }, 1000);
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return; 
    this.classList.add('flip');

    if (!hasFlippedCard) {
        // First click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    incrementMoves();
    checkForMatch();
}

function incrementMoves() {
    moves++;
    movesElement.textContent = moves;
}

function checkForMatch() {
    let isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    // Matches found: remove event listeners so they can't be clicked again
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    matchesFound++;
    
    if (matchesFound === emojis.length / 2) {
        endGame(true);
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true; 

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000); 
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Finally, End Game
function endGame(win) {
    clearInterval(timerInterval);
    gameOverScreen.classList.remove('hidden');
    if (win) {
        gameOverText.textContent = `You Won! Moves: ${moves}`;
    } else {
        gameOverText.textContent = `Time's Up! Try Again.`;
    }
}

// Start the game immediately on load
initGame();
