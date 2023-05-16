import './style.css';
import {generateLayout} from './script/generateHtml';
import { generateCells } from './script/generateHtml';
import { openCell } from './script/clickCell';
import { putFlag } from './script/clickCell';

const currentState = {
  difficulty: 'easy',
  mines: 10,
  darkMode: false,
  flagMode: false
}

generateLayout();
generateCells(currentState);

const modeBtn = document.querySelector('.theme-btn');
const cells = document.querySelectorAll('.cell');
const flagBtn = document.querySelector('.flag-btn');

document.addEventListener('contextmenu', (evt) => evt.preventDefault());

modeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
})

flagBtn.addEventListener('click', () => {
    flagBtn.classList.toggle('flag-active');
    currentState.flagMode = !currentState.flagMode;
    console.log(currentState.flagMode);
})

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





