class MemoryGame {
    constructor() {
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