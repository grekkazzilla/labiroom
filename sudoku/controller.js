// controller.js
// Glue: connects clicks on the pad and the board to model + view.

let currentNum = null; // выбранная цифра (0 = ничего не выбрано)

function markButtons() {
  numButtons.forEach(btn => {
    btn.style.background = (+btn.dataset.num === currentNum) ? '#ffe0b2' : '';
  });
}

// --- Persistence: save after every change ---

function persist() {
  saveGame(currentNum);
}

// --- Input: number pad ---

numButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentNum = +btn.dataset.num;
    markButtons();
    persist();
  });
});

// --- Input: board ---

SVG_arena.addEventListener('click', e => {
  if (isSolved()) return; // игра окончена — клики не работают

  const cell = e.target.closest('g');
  if (!cell) return;

  const r = +cell.dataset.row;
  const c = +cell.dataset.col;

  if (isGivenCell(r, c)) return; // заданные не трогаем

  if (cellVal(r, c) === EMPTY) {
    if (currentNum !== null && currentNum !== 0) {
      setCell(r, c, currentNum);
      renderAll();
      checkWin();
      persist();
    }
  } else {
    clearCell(r, c);
    renderAll();
    persist();
  }
});

// --- Input: keyboard ---

document.addEventListener('keydown', e => {
  if (/^[1-9]$/.test(e.key)) {
    currentNum = +e.key;
    markButtons();
    persist();
  }

  if (e.key === 'Backspace' || e.key === 'Delete') {
    currentNum = 0;
    markButtons();
    persist();
  }
});

// --- New game & win ---

function newGame() {
  hideWin();
  currentNum = null;
  markButtons();

  localStorage.removeItem('sudoku_board');
  localStorage.removeItem('sudoku_currentNum');

  loadPuzzle(generatePuzzle(50));
  renderAll();
}

newGameBtn.addEventListener('click', newGame);

function checkWin() {
  if (isSolved()) showWin();
}

// --- Startup with persistence ---

const savedNum = loadGame(); // вернёт null, если сохранения нет

if (savedNum !== null) {
  currentNum = savedNum;
  markButtons();
} else {
  loadPuzzle(generatePuzzle(50));
}

renderAll();

