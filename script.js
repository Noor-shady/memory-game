const gameBoard = document.getElementById('game-board');
const movesElement = document.getElementById('moves');
const timeElement = document.getElementById('time');
const gameOverScreen = document.getElementById('game-over');
const gameOverText = document.getElementById('game-over-text');

const emojis = ['🍕', '🍕', '🚀', '🚀', '🐱', '🐱', '🌵', '🌵', '🎸', '🎸', '🍦', '🍦', '💎', '💎', '🎈', '🎈'];

let cards = []; 