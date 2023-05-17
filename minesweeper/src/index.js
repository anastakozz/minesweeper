//TODO:
// implement startTimer()
// implement generateBombs()
// implement remainings bombs count




import './style.css';
import {generateLayout} from './script/generateHtml';
import { generateCells } from './script/generateHtml';
import { openCell } from './script/clickCells';
import { putFlag } from './script/clickCells';

const currentState = {
  difficulty: '10',
  mines: 10,
  darkMode: false,
  flagMode: false,
  clicksNum: 0
}

generateLayout();
generateCells(currentState);

const modeBtn = document.querySelector('.theme-btn');
const flagBtn = document.querySelector('.flag-btn');
const inputSize = document.querySelector('.choose-size');
const newGameBtn = document.querySelector('.new-game-btn');
const minesNum = document.querySelector('.mines-num');
const clickCount = document.querySelector('.clicks-count');


document.addEventListener('contextmenu', (evt) => evt.preventDefault());

modeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
})

flagBtn.addEventListener('click', () => {
    flagBtn.classList.toggle('flag-active');
    currentState.flagMode = !currentState.flagMode;
    console.log(currentState.flagMode);
})

function clickCell() {
    const cells = document.querySelectorAll('.cell');
    const cellsArr = Array.from(cells);
    let index = null;

    cells.forEach((cell) => {
        cell.addEventListener('click', (evt) => {
            index = cellsArr.indexOf(cell);
            if (currentState.flagMode) {
                putFlag(evt, index);
            }else{
                countClicks()
                openCell(evt, index)
            }
        });
        cell.addEventListener('contextmenu', (evt) => {
            if(!currentState.flagMode){
                index = cellsArr.indexOf(cell);
                putFlag(evt, index);
            }
        })
    })
}
clickCell()

function countClicks() {
    const clickCount = document.querySelector('.clicks-count');
    if (currentState.clicksNum === 0) {
        console.log('START');
        currentState.clicksNum += 1;
        // startTimer();
        // generateBombs();
    } else {
        currentState.clicksNum +=1;
    }
    clickCount.textContent = 'Cell clicks: ' + currentState.clicksNum;
}

inputSize.addEventListener('change', () => {
currentState.difficulty = inputSize.value;
console.log(currentState.difficulty);
})

newGameBtn.addEventListener('click',()=> {
    currentState.clicksNum = 0;
    generateCells(currentState);
    clickCell();
})

minesNum.addEventListener('change', () => {
    currentState.mines = +minesNum.value;
    console.log(currentState.mines);
})





