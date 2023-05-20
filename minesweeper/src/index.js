// TODO:
// implement startTimer()
// implement generateBombs()
// implement remainings bombs count

import './style.css';
import { generateLayout, generateCells, generateZeroMatrix } from './script/generateHtml';
import { openCell, putFlag } from './script/clickCells';
import { generateMinesArr, fillMatrix } from './script/generateMines';
import { startStopTimer } from './script/timer';

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

  timer: {
    sec: 0,
    min: 0,
    timeOn: false
  }
};


generateLayout();
generateCells(currState);
generateZeroMatrix(currState, +currState.difficulty);

const modeBtn = document.querySelector('.theme-btn');
const flagBtn = document.querySelector('.flag-btn');
const inputSize = document.querySelector('.choose-size');
const newGameBtn = document.querySelector('.new-game-btn');
const minesNum = document.querySelector('.mines-num');
const popup = document.querySelector('.popup-background');
const popupTitle = document.querySelector('.popup-title');
const popupText = document.querySelector('.popup-text');


currState.cells = document.querySelectorAll('.cell');
currState.cellsArr = Array.from(currState.cells);


function countClicks(evt, index) {
  const clickCount = document.querySelector('.clicks-count');
  if (currState.clicksNum === 0 && !evt.currentTarget.classList.contains('cell-flag')) {
    console.log('START');
    currState.clicksNum += 1;
    currState.timer.timeOn = true;
    console.log(currState.timer.timeOn);
    startStopTimer(currState.timer.timeOn);
    currState.minesArr = generateMinesArr(currState.minesCount, +currState.difficulty, index);
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
        putFlag(evt, index, currState.minesCount);
      } else {
        countClicks(evt, index);
        let result = openCell(evt, index, currState.matrix, currState.cellsArr);
        let openCells = document.querySelectorAll('.cell-open').length;
        if (result === 'gameover'){
            gameover();
        } else if ( openCells === (Math.pow(+currState.difficulty, 2) - currState.minesCount)){
            win();
        }
      }
    });
    cell.addEventListener('contextmenu', (evt) => {
      if (!currState.flagMode) {
        index = currState.cellsArr.indexOf(cell);
        putFlag(evt, index, currState.minesCount);
      }
    });
  });
}

function startGame() {
    currState.difficulty = inputSize.value;
    currState.minesCount = +minesNum.value;
    inputSize.classList.remove('changed');
    minesNum.classList.remove('changed');
    generateCells(currState);
    generateZeroMatrix(currState, +currState.difficulty);
    currState.clicksNum = 0;
    currState.cells = document.querySelectorAll('.cell');
    currState.cellsArr = Array.from(currState.cells);
    currState.timer.timeOn = false;
    console.log(currState.timer.timeOn);
    startStopTimer(currState.timer.timeOn);
    clickCell();
}

function gameover() {
    popup.classList.toggle('hidden');
    popupTitle.textContent = 'GAME OVER!';
    popupText.textContent = 'Try again!';
    document.body.style.overflow = 'hidden';
    popup.classList.add('gameover');
    popup.classList.remove('win');
}

function win(){
    currState.timer.timeOn = false;
    let result = startStopTimer(currState.timer.timeOn);
    popup.classList.toggle('hidden');
    popupTitle.textContent = 'Hooray!';
    popupText.textContent = `You found all mines in ${result} seconds and ${currState.clicksNum} moves!`;
    document.body.style.overflow = 'hidden';
    popup.classList.add('win');
    popup.classList.remove('gameover');
}

document.addEventListener('contextmenu', (evt) => evt.preventDefault());


clickCell();


inputSize.addEventListener('change', () => {
  minesNum.value = inputSize.value;
  inputSize.classList.add('changed');
  minesNum.classList.add('changed');
});

newGameBtn.addEventListener('click', () => {
  startGame()
});

minesNum.addEventListener('change', () => {
    minesNum.classList.add('changed');
});

popup.addEventListener('click', () => {
    popup.classList.toggle('hidden');
    document.body.style.overflow = '';
    startGame()
});

modeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

flagBtn.addEventListener('click', () => {
  flagBtn.classList.toggle('flag-active');
  currState.flagMode = !currState.flagMode;
  console.log(currState.flagMode);
});

