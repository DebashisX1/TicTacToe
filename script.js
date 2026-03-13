const boardelem = document.getElementById('board');
const statuselem = document.getElementById('status');
const restartbtn = document.getElementById('restart');
const resetstats = document.getElementById('reset-stats');
const hardResetBtn = document.getElementById('hard-reset');
const resetstreak = document.getElementById('reset-streak');
const modeToggleBtn = document.getElementById('mode-toggle');
const scoreX = document.getElementById('score-X');
const scoreO = document.getElementById('score-O');
const scoredraw = document.getElementById('draw');
const highX = document.getElementById('high-X');
const highO = document.getElementById('high-O');

const barX = document.getElementById('bar-X');
const barO = document.getElementById('bar-O');

const s3X = document.getElementById('s3-X'), s3O = document.getElementById('s3-O');
const s4X = document.getElementById('s4-X'), s4O = document.getElementById('s4-O');
const f3X = document.getElementById('f3-X'), f3O = document.getElementById('f3-O');
const f4X = document.getElementById('f4-X'), f4O = document.getElementById('f4-O');

let is4x4 = false;
let board = [];
let currentPlayer = 'X';
let gameActive = true;
let scores = { X: 0, O: 0, Draw: 0 };

let highScores = {
   X: 0,
   O: 0
};

let streaks = JSON.parse(localStorage.getItem('ttt-4-streaks')) || {
   s3: { X: 0, O: 0 },
   s4: { X: 0, O: 0 },
   date: new Date().toDateString()
};

if (streaks.date !== new Date().toDateString()) {
   streaks = { s3: { X: 0, O: 0 }, s4: { X: 0, O: 0 }, date: new Date().toDateString() };
   saveStreaks();
}

const COMBOS3 = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const COMBOS4 = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15], [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15], [0, 5, 10, 15], [3, 6, 9, 12]];

function initGame() {
   boardelem.innerHTML = '';
   const size = is4x4 ? 16 : 9;
   board = Array(size).fill('');
   boardelem.style.gridTemplateColumns = `repeat(${is4x4 ? 4 : 3}, 1fr)`;
   boardelem.style.width = is4x4 ? '400px' : '300px';


   for (let i = 0; i < size; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('data-index', i);
      cell.addEventListener('click', handleCellClick);
      boardelem.appendChild(cell);
   }
   updateDisplay();
}

function handleCellClick(e) {
   const index = e.target.dataset.index;
   if (board[index] !== '' || !gameActive) return;

   board[index] = currentPlayer;
   e.target.textContent = currentPlayer;
   e.target.classList.add(currentPlayer.toLowerCase());

   const winCombo = checkWin();
   if (winCombo) {
      gameActive = false;
      statuselem.textContent = `Player ${currentPlayer} Wins!`;
      statuselem.classList.add('winner');
      scores[currentPlayer]++;

      updateHighScores(currentPlayer);
      updateStreakLogic(currentPlayer);
      updateDisplay();
      highlightWin(winCombo);
      return;
   }

   if (board.every(cell => cell !== '')) {
      gameActive = false;
      statuselem.textContent = "Draw!";
      statuselem.classList.add('draw');
      scores.Draw++;
      updateDisplay();
      return;
   }

   currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
   statuselem.textContent = `${currentPlayer}'s Turn`;
}

function checkWin() {
   const combos = is4x4 ? COMBOS4 : COMBOS3;
   return combos.find(combo => combo.every(idx => board[idx] === currentPlayer));
}

function updateHighScores(player) {
   if (scores[player] > highScores[player]) {
      highScores[player] = scores[player];
      localStorage.setItem(`ttt-high-${player}`, highScores[player]);
   }
}

function updateStreakLogic(player) {
   const modeKey = is4x4 ? 's4' : 's3';
   let opponent = (player == 'X') ? 'O' : 'X';
   if (streaks[modeKey][player] < 5) {
      streaks[modeKey][player]++;
      streaks[modeKey][opponent] =0;
      if (streaks[modeKey][player] === 5) {
         triggerCelebration(player, is4x4 ? "4x4" : "3x3");
      }
      saveStreaks();
   }
}

function triggerCelebration(player, mode) {
   confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: player === 'X' ? ['#4ecdc4', '#ffffff'] : ['#ff6b6b', '#ffffff']
   });
   alert(`CONGRATULATIONS! Player ${player} completed the ${mode} Daily Streak!`);
}

function saveStreaks() { localStorage.setItem('ttt-4-streaks', JSON.stringify(streaks)); }

function updateDisplay() {
   scoreX.textContent = scores.X;
   scoreO.textContent = scores.O;
   scoredraw.textContent = scores.Draw;
   highX.textContent = highScores.X;
   highO.textContent = highScores.O;

   // Bar Diagram Logic
   const maxBest = Math.max(highScores.X, highScores.O, 1);
   barX.style.height = `calc(${(highScores.X / maxBest) * 80}% + 10px)`;
   barO.style.height = `calc(${(highScores.O / maxBest) * 80}% + 10px)`;

   s3X.textContent = streaks.s3.X; s3O.textContent = streaks.s3.O;
   s4X.textContent = streaks.s4.X; s4O.textContent = streaks.s4.O;
   f3X.style.width = `${(streaks.s3.X / 5) * 100}%`;
   f3O.style.width = `${(streaks.s3.O / 5) * 100}%`;
   f4X.style.width = `${(streaks.s4.X / 5) * 100}%`;
   f4O.style.width = `${(streaks.s4.O / 5) * 100}%`;
   if(scores.X > scores.O)
   {
      scoreX.style.color = `#cdcd4e`;
      scoreX.style.fontSize = `30px`;
   }
   else if (scores.X < scores.O)
   {
      scoreO.style.color = `#ff6b6b`
      scoreO.style.fontSize = `30px`;

   }
   else if(scores.X == scores.O)
   {
      scoreO.style.color = scoreX.style.color = `white`;
      scoreO.style.fontSize =  scoreX.style.fontSize = `25px`;
   }
   else if (scores.X == scores.O == scoredraw)
   {
      scoreO.style.fontSize = scoreX.style.fontSize = scoredraw.style.fontSize = `25px`;
      scoreO.style.color = scoreX.style.color = scoredraw.style.color = `white`;
   }


}

function highlightWin(combo) {
   const cells = document.querySelectorAll('.cell');
   combo.forEach(idx => cells[idx].classList.add('win'));
}

modeToggleBtn.addEventListener('click', () => {
   boardelem.classList.add('switching');
   setTimeout(() => {
      is4x4 = !is4x4;
      modeToggleBtn.textContent = is4x4 ? "Switch to 3x3" : "Switch to 4x4";
      scores = {X: 0, O: 0, Draw: 0}
      restartGame();
      boardelem.classList.remove('switching');
   }, 300);
});

restartbtn.addEventListener('click', restartGame);
function restartGame() {
   gameActive = true; currentPlayer = 'X';
   statuselem.textContent = " Player X's Turn";
   statuselem.classList.remove('winner', 'draw');
   initGame();
}

resetstats.addEventListener('click', () => { scores = { X: 0, O: 0, Draw: 0 }; highScores = { X: 0, O: 0 }; updateDisplay(); restartGame(); });
hardResetBtn.addEventListener('click', () => {
   if (confirm("Reset current scores and all-time bests?")) {
      scores = { X: 0, O: 0, Draw: 0 };
      highScores = { X: 0, O: 0 };
      streaks = { s3: { X: 0, O: 0 }, s4: { X: 0, O: 0 }};
      localStorage.removeItem('ttt-high-X'); localStorage.removeItem('ttt-high-O');
      updateDisplay(); restartGame();
   }
});

resetstreak.addEventListener('click', () => {
   if (confirm("Reset ALL daily streaks?")) {
      streaks = { s3: { X: 0, O: 0 }, s4: { X: 0, O: 0 }, date: new Date().toDateString() };
      localStorage.removeItem('ttt-high-X'); localStorage.removeItem('ttt-high-O');
      saveStreaks(); updateDisplay();
   }
});

initGame();