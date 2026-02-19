class MemoryGame {
    constructor() {
        // DOM Elements
        this.gameBoard = document.getElementById('game-board');
        this.movesElement = document.getElementById('moves');
        this.timeElement = document.getElementById('time');
        this.gameOverScreen = document.getElementById('game-over-modal');
        this.gameOverText = document.getElementById('game-over-text');
        this.restartBtn = document.getElementById('restart-btn');

        // Game Constants
        this.emojis = ['🍕', '🍕', '🚀', '🚀', '🐱', '🐱', '🌵', '🌵', '🎸', '🎸', '🍦', '🍦', '💎', '💎', '🎈', '🎈'];
        this.TOTAL_TIME = 60;

        // Game State
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
        this.moves = 0;
        this.matchesFound = 0;
        this.timeLeft = this.TOTAL_TIME;
        this.timerInterval = null;
        this.gameStarted = false;

        this.initEventListeners();
        this.initGame();
    }

    initEventListeners() {
        this.restartBtn.addEventListener('click', () => this.resetGame());
    }

    shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    initGame() {
        this.gameBoard.innerHTML = '';
        const shuffledEmojis = this.shuffle([...this.emojis]);

        shuffledEmojis.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.emoji = emoji;
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `Card ${index + 1}`);

            card.innerHTML = `
                <div class="front-face">${emoji}</div>
                <div class="back-face">?</div>
            `;
            
            card.addEventListener('click', () => this.flipCard(card));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.flipCard(card);
                }
            });

            this.gameBoard.appendChild(card);
        });
    }

    startTimer() {
        this.gameStarted = true;
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.timeElement.textContent = this.timeLeft;

            if (this.timeLeft <= 0) {
                this.endGame(false);
            }
        }, 1000);
    }

    flipCard(card) {
        // Start timer on very first interaction
        if (!this.gameStarted) this.startTimer();

        if (this.lockBoard) return;
        if (card === this.firstCard) return; 
        if (card.classList.contains('matched')) return;

        card.classList.add('flip');

        if (!this.hasFlippedCard) {
            this.hasFlippedCard = true;
            this.firstCard = card;
            return;
        }

        this.secondCard = card;
        this.incrementMoves();
        this.checkForMatch();
    }

    incrementMoves() {
        this.moves++;
        this.movesElement.textContent = this.moves;
    }

    checkForMatch() {
        const isMatch = this.firstCard.dataset.emoji === this.secondCard.dataset.emoji;
        isMatch ? this.disableCards() : this.unflipCards();
    }

    disableCards() {
        this.firstCard.classList.add('matched');
        this.secondCard.classList.add('matched');

        this.matchesFound++;
        
        if (this.matchesFound === this.emojis.length / 2) {
            this.endGame(true);
        }

        this.resetBoard();
    }

    unflipCards() {
        this.lockBoard = true; 

        setTimeout(() => {
            this.firstCard.classList.remove('flip');
            this.secondCard.classList.remove('flip');
            this.resetBoard();
        }, 1000); 
    }

    resetBoard() {
        [this.hasFlippedCard, this.lockBoard] = [false, false];
        [this.firstCard, this.secondCard] = [null, null];
    }

    endGame(win) {
        clearInterval(this.timerInterval);
        this.gameOverScreen.classList.remove('hidden');
        
        if (win) {
            this.gameOverText.textContent = `You Won! Moves: ${this.moves}`;
        } else {
            this.gameOverText.textContent = `Time's Up! Try Again.`;
        }
    }

    resetGame() {