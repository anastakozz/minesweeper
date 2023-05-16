import './style.css';
import {generateLayout} from './script/generateHtml';
import { generateCells } from './script/generateHtml';
import { openCell } from './script/clickCell';
import { putFlag } from './script/clickCell';

const currentState = {
  difficulty: '10',
  mines: 10,
  darkMode: false,
  flagMode: false
}

generateLayout();
generateCells(currentState);

const modeBtn = document.querySelector('.theme-btn');

const flagBtn = document.querySelector('.flag-btn');
const inputSize = document.querySelector('.choose-size');
const newGameBtn = document.querySelector('.new-game-btn');
const minesNum = document.querySelector('.mines-num');

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
    cells.forEach((cell) => {
        cell.addEventListener('click', (evt) => {
            if (currentState.flagMode) {
                putFlag(evt)
            }else{
                openCell(evt)
            }
        });
        cell.addEventListener('contextmenu', (evt) => {
            if(!currentState.flagMode){
                putFlag(evt);
            }
        })
    })
}
clickCell()

inputSize.addEventListener('change', () => {
currentState.difficulty = inputSize.value;
console.log(currentState.difficulty);
})

newGameBtn.addEventListener('click',()=> {
    generateCells(currentState);
    clickCell();
})

minesNum.addEventListener('change', () => {
    currentState.mines = +minesNum.value;
    console.log(currentState.mines);
})





