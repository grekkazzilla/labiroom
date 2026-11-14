// view.js
// Visual layer: builds the SVG grid and draws state from the model.
// Uses only standard DOM/SVG APIs — no external helpers.

const SVG_NS = 'http://www.w3.org/2000/svg';
const CELL_SIZE = 77;
const BOARD_PX = SIZE * CELL_SIZE;

// cells[r][c] — SVG <g> element for the cell at row r, column c
const cells = [];

// --- Element factories ---

function makeSVG(tag, attrs = {}) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [name, value] of Object.entries(attrs)) {
    el.setAttribute(name, value);
  }
  return el;
}

function makeCell(r, c) {
  const cell = makeSVG('g', { transform: `translate(${c * CELL_SIZE} ${r * CELL_SIZE})` });

  cell.appendChild(makeSVG('rect', {
    x: 0, y: 0,
    width: CELL_SIZE, height: CELL_SIZE,
    fill: '#fff', stroke: '#999', 'stroke-width': 1
  }));

  cell.appendChild(makeSVG('text', {
    x: CELL_SIZE / 2,
    y: CELL_SIZE / 2,
    'text-anchor': 'middle',
    'dominant-baseline': 'central',
    'font-size': 24,
    'font-family': 'sans-serif',
    fill: '#333'
  }));

  cell.dataset.row = r;
  cell.dataset.col = c;
  return cell;
}

// --- Build the grid ---

/* already exists inline

const SVG_arena = makeSVG('svg', {
  width: BOARD_PX,
  height: BOARD_PX,
  viewBox: `0 0 ${BOARD_PX} ${BOARD_PX}`
});
document.body.appendChild(SVG_arena);

*/

for (let r = 0; r < SIZE; r++) {
  cells[r] = [];
  for (let c = 0; c < SIZE; c++) {
    cells[r][c] = makeCell(r, c);
    SVG_arena.appendChild(cells[r][c]);
  }
}

// --- Drawing ---

// Draw one cell: read value from the model, show it in SVG
function drawCell(r, c) {
  const val = cellVal(r, c);
  const text = cells[r][c].querySelector('text');
  text.textContent = (val === EMPTY) ? '' : val;

  if (val === EMPTY) {
    text.style.fill = '#333';            // пусто — цвет не важен, но сбросим
  } else if (isGivenCell(r, c)) {
    text.style.fill = '#c0c0c0';         // заданные — всегда серые, никогда не краснеют
  } else {
    text.style.fill = conflictsAt(r, c) ? '#d32f2f' : '#333';  // игрок: чёрный или красный
  }
}

// Redraw the whole board (used after loadPuzzle)
function renderAll() {
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      drawCell(r, c);
}

// --- Number pad ---

const pad = document.createElement('div');
pad.style.cssText = 'display:flex; gap:6px; margin-top:12px;';
document.body.appendChild(pad);

const numButtons = [];

for (let n = 1; n <= 9; n++) {
  const btn = document.createElement('button');
  btn.textContent = n;
  btn.dataset.num = n;
  btn.style.cssText = 'width:40px; height:40px; font-size:18px; cursor:pointer;';
  pad.appendChild(btn);
  numButtons.push(btn);
}

// Button for clearing a cell
const clearBtn = document.createElement('button');
clearBtn.textContent = 'C';
clearBtn.dataset.num = 0;
clearBtn.style.cssText = 'width:40px; height:40px; font-size:18px; cursor:pointer;';
pad.appendChild(clearBtn);
numButtons.push(clearBtn);

// --- New game button ---

const newGameBtn = document.createElement('button');
newGameBtn.textContent = 'New game';
newGameBtn.style.cssText = 'height:40px; margin-left:12px; padding:0 16px; font-size:16px; cursor:pointer;';
pad.appendChild(newGameBtn);

// --- Win overlay ---

function showWin() {
  if (document.getElementById('winOverlay')) return; // уже показан

  const overlay = document.createElement('div');
  overlay.id = 'winOverlay';
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(255,255,255,0.85);
    display: flex; align-items: center; justify-content: center;
    font-size: 40px; font-family: sans-serif; color: #2e7d32;
  `;
  overlay.textContent = 'You win! 🎉';
  document.body.appendChild(overlay);
}

function hideWin() {
  const overlay = document.getElementById('winOverlay');
  if (overlay) overlay.remove();
}

