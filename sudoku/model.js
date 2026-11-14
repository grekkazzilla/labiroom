// model.js
// Pure Sudoku logic. No DOM, no rendering — only data and rules.

const SIZE = 9;
const EMPTY = null;

// board[r][c] represents an abstract cell:
// val     – current value: null or 1–9
// isGiven – true if this digit is part of the initial puzzle (cannot be changed)
const board = Array.from({ length: SIZE }, () =>
  Array.from({ length: SIZE }, () => ({ val: EMPTY, isGiven: false }))
);

// --- Accessors ---

function cellVal(r, c) {
  return board[r][c].val;
}

function setCell(r, c, num) {
  board[r][c].val = num;
}

function clearCell(r, c) {
  board[r][c].val = EMPTY;
}

// --- Validation Rules ---

function isInRow(r, num) {
  return board[r].some(cell => cell.val === num);
}

function isInCol(c, num) {
  return board.some(row => row[c].val === num);
}

function isInBox(r, c, num) {
  const startR = Math.floor(r / 3) * 3;
  const startC = Math.floor(c / 3) * 3;
  for (let dr = 0; dr < 3; dr++) {
    for (let dc = 0; dc < 3; dc++) {
      if (board[startR + dr][startC + dc].val === num) return true;
    }
  }
  return false;
}

function canPlace(r, c, num) {
  if (board[r][c].isGiven) return false;   // Cannot change given digits
  if (num === EMPTY) return true;          // Clearing a cell is always allowed
  return !isInRow(r, num) && !isInCol(c, num) && !isInBox(r, c, num);
}

// --- Game State Helpers ---

function isFull() {
  return board.every(row => row.every(cell => cell.val !== EMPTY));
}

/**
 * Load a puzzle from a 2D array.
 * Example puzzleData:
 * [
 *   [5, 3, 0, 0, 7, 0, 0, 0, 0],
 *   [6, 0, 0, 1, 9, 5, 0, 0, 0],
 *   ...
 * ]
 */
function loadPuzzle(puzzleData) {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const val = puzzleData[r][c];
      board[r][c].val = (val === 0 || val === null) ? EMPTY : val;
      board[r][c].isGiven = (val !== 0 && val !== null);
    }
  }
}

// --- Puzzle Generation ---

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function findEmpty() {
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      if (board[r][c].val === EMPTY) return { r, c };
  return null;
}

function solve() {
  const spot = findEmpty();
  if (!spot) return true; // no empty cells left — board is complete

  const { r, c } = spot;
  const digits = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (const num of digits) {
    if (canPlace(r, c, num)) {
      board[r][c].val = num;
      if (solve()) return true;
      board[r][c].val = EMPTY; // dead end — undo and try next digit
    }
  }
  return false;
}

function generatePuzzle(holes = 50) {
  // 1. reset and fill with a random complete solution
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++){
      board[r][c].val = EMPTY;
      board[r][c].isGiven = false;
    }
  solve();

  // 2. remove digits at random positions
  const positions = [];
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      positions.push([r, c]);
  shuffle(positions);

  for (let i = 0; i < holes; i++) {
    const [r, c] = positions[i];
    board[r][c].val = EMPTY;
  }

  // 3. return the board as puzzle data (0 = empty)
  return board.map(row => row.map(cell => cell.val === EMPTY ? 0 : cell.val));
}

// --- Conflict check (ignores the cell itself) ---

// true, если значение в этой клетке повторяется в строке, столбце или боксе
function conflictsAt(r, c) {
  const num = board[r][c].val;
  if (num === EMPTY) return false;

  for (let i = 0; i < SIZE; i++) {
    if (i !== c && board[r][i].val === num) return true; // строка
    if (i !== r && board[i][c].val === num) return true; // столбец
  }

  const startR = Math.floor(r / 3) * 3;
  const startC = Math.floor(c / 3) * 3;
  for (let dr = 0; dr < 3; dr++) {
    for (let dc = 0; dc < 3; dc++) {
      const rr = startR + dr;
      const cc = startC + dc;
      if ((rr !== r || cc !== c) && board[rr][cc].val === num) return true;
    }
  }
  return false;
}

// Доступ к флагу заданной клетки для контроллера
function isGivenCell(r, c) {
  return board[r][c].isGiven;
}

// --- Win check ---

function hasConflicts() {
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      if (conflictsAt(r, c)) return true;
  return false;
}

function isSolved() {
  return isFull() && !hasConflicts();
}

// --- Persistence helpers ---

function saveGame(currentNumValue) {
  const snapshot = board.map(row =>
    row.map(cell => ({ val: cell.val, isGiven: cell.isGiven }))
  );
  localStorage.setItem('sudoku_board', JSON.stringify(snapshot));
  localStorage.setItem('sudoku_currentNum', currentNumValue);
}


function loadGame() {
  const raw = localStorage.getItem('sudoku_board');
  if (!raw) return null;

  const saved = JSON.parse(raw);
  // Восстанавливаем доску
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      board[r][c].val = saved[r][c].val;
      board[r][c].isGiven = saved[r][c].isGiven;
    }
  }
  const num = localStorage.getItem('sudoku_currentNum');
  return (num === null) ? null : +num;
}

