// TODO:
// implement startTimer()
// implement generateBombs()
// implement remainings bombs count

import './style.css';
import { generateLayout, generateCells, generateZeroMatrix } from './script/generateHtml';
import { openCell, putFlag } from './script/clickCells';
import { generateMinesArr, fillMatrix } from './script/generateMines';

const currState = {
  difficulty: '10',
  minesCount: 10,
  darkMode: false,
  flagMode: false,
  clicksNum: 0,
  cells: '',
  cellsArr: [],
  minesArr: [],
  matrix: [],
};

generateLayout();
generateCells(currState);
generateZeroMatrix(currState, +currState.difficulty);

const modeBtn = document.querySelector('.theme-btn');
const flagBtn = document.querySelector('.flag-btn');
const inputSize = document.querySelector('.choose-size');
const newGameBtn = document.querySelector('.new-game-btn');
const minesNum = document.querySelector('.mines-num');

currState.cells = document.querySelectorAll('.cell');
currState.cellsArr = Array.from(currState.cells);

document.addEventListener('contextmenu', (evt) => evt.preventDefault());

modeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

flagBtn.addEventListener('click', () => {
  flagBtn.classList.toggle('flag-active');
  currState.flagMode = !currState.flagMode;
  console.log(currState.flagMode);
});

function countClicks(evt, index) {
  const clickCount = document.querySelector('.clicks-count');
  if (currState.clicksNum === 0 && !evt.currentTarget.classList.contains('cell-flag')) {
    console.log('START');
    currState.clicksNum += 1;
    // startTimer();
    currState.minesArr = generateMinesArr(currState.minesCount, +currState.difficulty, index);
    // console.log(currentState.minesArr);
    fillMatrix(currState);
  } else if (!evt.currentTarget.classList.contains('cell-flag')) {
    currState.clicksNum += 1;
  }
  clickCount.textContent = `Cell clicks: ${currState.clicksNum}`;
}

function clickCell() {
  let index = null;
  currState.cells.forEach((cell) => {
    cell.addEventListener('click', (evt) => {
      index = currState.cellsArr.indexOf(cell);
      if (currState.flagMode) {
        putFlag(evt, index);
      } else {
        countClicks(evt, index);
        openCell(evt, index, currState.minesArr);
      }
    });
    cell.addEventListener('contextmenu', (evt) => {
      if (!currState.flagMode) {
        index = currState.cellsArr.indexOf(cell);
        putFlag(evt, index);
      }
    });
  });
}
clickCell();

inputSize.addEventListener('change', () => {
  minesNum.value = inputSize.value;
});

newGameBtn.addEventListener('click', () => {
  currState.difficulty = inputSize.value;
  currState.minesCount = +minesNum.value;
  generateCells(currState);
  generateZeroMatrix(currState, +currState.difficulty);
  currState.clicksNum = 0;
  currState.cells = document.querySelectorAll('.cell');
  currState.cellsArr = Array.from(currState.cells);
  clickCell();
//   console.log(`check array length: ${currState.cellsArr.length}`);
});

// minesNum.addEventListener('change', () => {
//   console.log(currState.minesCount);
// });
