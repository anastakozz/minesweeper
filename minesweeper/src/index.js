import './style.css';
import { generateLayout, generateCells, generateZeroMatrix } from './script/generateHtml';
import { openCell, putFlag } from './script/clickCells';
import { generateMinesArr, fillMatrix } from './script/generateMines';
import { startStopTimer } from './script/timer';
import { getDateTime } from './script/getDate';
import { playAudio } from './script/playSounds';

let stat;

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
  soundOn: false,

  timer: {
    sec: 0,
    min: 0,
    timeOn: false,
  },
};

generateLayout();

if(localStorage.getItem('stat')){
  document.querySelector('.saved-stat').innerHTML = localStorage.getItem('stat');
}

const modeBtn = document.querySelector('.theme-btn');
const flagBtn = document.querySelector('.flag-btn');
const inputSize = document.querySelector('.choose-size');
const newGameBtn = document.querySelector('.new-game-btn');
const minesNum = document.querySelector('.mines-num');
const popup = document.querySelector('.popup-background');
const popupTitle = document.querySelector('.popup-title');
const popupText = document.querySelector('.popup-text');
const histDate = document.querySelector('.history-date');
const histTime = document.querySelector('.history-time');
const histClicks = document.querySelector('.history-clicks');
const histBombs = document.querySelector('.history-num');
const soundBtn = document.querySelector('.sound-btn');


generateCells(currState);
generateZeroMatrix(currState, +currState.difficulty);
currState.cells = document.querySelectorAll('.cell');
currState.cellsArr = Array.from(currState.cells);


function countClicks(evt, index) {
  const clickCount = document.querySelector('.clicks-count');
  if (currState.clicksNum === 0 && !evt.currentTarget.classList.contains('cell-flag')) {
    console.log('START');
    currState.clicksNum += 1;
    currState.timer.timeOn = true;
    startStopTimer(currState.timer.timeOn);
    currState.minesArr = generateMinesArr(currState.minesCount, +currState.difficulty, index);
    fillMatrix(currState);
  } else if (!evt.currentTarget.classList.contains('cell-flag')) {
    currState.clicksNum += 1;
  }
  clickCount.textContent = `Cell clicks: ${currState.clicksNum}`;
}

function gameover() {
  playAudio('lose', currState.soundOn);
  popup.classList.toggle('hidden');
  popupTitle.textContent = 'GAME OVER!';
  popupText.textContent = 'Try again!';
  document.body.style.overflow = 'hidden';
  popup.classList.add('gameover');
  popup.classList.remove('win');
}

function writeStats(result) {
  const num = document.querySelectorAll('.result');
  if (num.length === 10) {
    histTime.children[histTime.children.length - 1].remove();
    histClicks.children[histClicks.children.length - 1].remove();
    histDate.children[histDate.children.length - 1].remove();
    histBombs.children[histBombs.children.length - 1].remove();
  }

  const newTime = document.createElement('div');
  newTime.classList.add('result', 'hist');
  newTime.textContent = result;
  histTime.prepend(newTime);

  const newMoves = document.createElement('div');
  newMoves.textContent = currState.clicksNum;
  newMoves.classList.add('hist');
  histClicks.prepend(newMoves);

  const newDate = document.createElement('div');
  newDate.textContent = getDateTime();
  newDate.classList.add('date-hist-title');
  histDate.prepend(newDate);

  const newBombs = document.createElement('div');
  newBombs.textContent = currState.minesCount;
  newBombs.classList.add('hist');
  histBombs.prepend(newBombs);
}

function win() {
  playAudio('win', currState.soundOn);
  currState.timer.timeOn = false;
  const result = startStopTimer(currState.timer.timeOn);
  popup.classList.toggle('hidden');
  popupTitle.textContent = 'Hooray!';
  popupText.textContent = `You found all mines in ${result} seconds and ${currState.clicksNum} moves!`;
  document.body.style.overflow = 'hidden';
  popup.classList.add('win');
  popup.classList.remove('gameover');
  writeStats(result);
}

function clickCell() {
  let index = null;
  currState.cells.forEach((cell) => {
    cell.addEventListener('click', (evt) => {
      index = currState.cellsArr.indexOf(cell);
      if (currState.flagMode) {
        playAudio('flag', currState.soundOn);
        putFlag(evt, index, currState.minesCount);
      } else {
        countClicks(evt, index);

        const result = openCell(evt, index, currState.matrix, currState.cellsArr);
        const openCells = document.querySelectorAll('.cell-open').length;
        if (result === 'gameover') {
          gameover();
        } else if (openCells === ((+currState.difficulty) ** 2 - currState.minesCount)) {
          win();
        } else {
          playAudio('open', currState.soundOn);
        }
      }
    });
    cell.addEventListener('contextmenu', (evt) => {
      if (!currState.flagMode) {
        index = currState.cellsArr.indexOf(cell);
        playAudio('flag', currState.soundOn);
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
  // console.log(currState.timer.timeOn);
  startStopTimer(currState.timer.timeOn);
  clickCell();
}
function setLocalStorage() {
  stat = document.querySelector('.saved-stat').innerHTML;
  localStorage.setItem('stat', stat );
}



window.addEventListener('beforeunload', setLocalStorage);
document.addEventListener('contextmenu', (evt) => evt.preventDefault());

clickCell();

inputSize.addEventListener('change', () => {
  minesNum.value = inputSize.value;
  inputSize.classList.add('changed');
  minesNum.classList.add('changed');
});

newGameBtn.addEventListener('click', () => {
  startGame();
});

minesNum.addEventListener('change', () => {
  minesNum.classList.add('changed');
});

popup.addEventListener('click', () => {
  popup.classList.toggle('hidden');
  document.body.style.overflow = '';
  startGame();
});

modeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

flagBtn.addEventListener('click', () => {
  flagBtn.classList.toggle('flag-active');
  currState.flagMode = !currState.flagMode;
  // console.log(currState.flagMode);
});

soundBtn.addEventListener('click', () => {
  currState.soundOn = !currState.soundOn;
  soundBtn.classList.toggle('sound-on');
  console.log(currState.soundOn);
});
