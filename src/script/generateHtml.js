/**
 * Creates basic html layout for minesweeper
 *
 * @return {html structure}
 */

let main;
let wrapper;
let mainTitle;
let flagExpl;
let game;
let gameSetup;
let gameHead;
let gameField;
let statDiv;
let btnDiv;
let soundBtn;
let themeBtn;
let selectSize;
let opt1;
let opt2;
let opt3;
let timerDiv;
let timer;
let newGameBtn;
let minesDiv;
let minesNumInput;
let flagBtn;
let flagCount;
let clicksCount;
let cellContainer;
let statTitle;
let statistics;
let histNum;
let histDate;
let histTime;
let histClicks;
let titleNum;
let titleDate;
let titleTime;
let titleClicks;
let popupMsg;
let popup;
let statTitles;

export function generateLayout() {
  main = document.createElement('main');

  wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  main.appendChild(wrapper);

  mainTitle = document.createElement('h1');
  mainTitle.classList.add('main-title');
  mainTitle.textContent = 'Minesweeper game';
  wrapper.appendChild(mainTitle);

  flagExpl = document.createElement('h3');
  flagExpl.textContent = 'RightClick to put a flag';
  wrapper.appendChild(flagExpl);

  game = document.createElement('div');
  game.classList.add('game');
  wrapper.appendChild(game);

  popup = document.createElement('div');
  popup.classList.add('popup-background', 'hidden');
  main.appendChild(popup);

  popupMsg = document.createElement('div');
  popupMsg.classList.add('popup-msg');
  popup.appendChild(popupMsg);

  const popupTitle = document.createElement('h3');
  popupTitle.classList.add('popup-title');
  popupMsg.appendChild(popupTitle);
  popupTitle.textContent = 'Hooray!';

  const popupText = document.createElement('p');
  popupText.classList.add('popup-text');
  popupMsg.appendChild(popupText);
  popupText.textContent = 'You found all mines in ## seconds and N moves!';

  // SETUP
  gameSetup = document.createElement('div');
  gameSetup.classList.add('game-setup');
  game.appendChild(gameSetup);

  btnDiv = document.createElement('div');
  gameSetup.appendChild(btnDiv);

  soundBtn = document.createElement('button');
  soundBtn.classList.add('sound-btn');
  btnDiv.appendChild(soundBtn);

  themeBtn = document.createElement('button');
  themeBtn.classList.add('theme-btn');
  btnDiv.appendChild(themeBtn);

  selectSize = document.createElement('select');
  selectSize.classList.add('choose-size');
  gameSetup.appendChild(selectSize);

  opt1 = document.createElement('option');
  opt1.value = 10;
  opt1.textContent = 'easy';
  selectSize.appendChild(opt1);

  opt2 = document.createElement('option');
  opt2.value = 15;
  opt2.textContent = 'medium';
  selectSize.appendChild(opt2);

  opt3 = document.createElement('option');
  opt3.value = 25;
  opt3.textContent = 'hard';
  selectSize.appendChild(opt3);

  // HEAD
  gameHead = document.createElement('div');
  gameHead.classList.add('game-head');
  game.appendChild(gameHead);

  timerDiv = document.createElement('div');
  timerDiv.classList.add('timer-div');
  gameHead.appendChild(timerDiv);

  timer = document.createElement('span');
  timer.classList.add('timer');
  timer.textContent = '0:00';
  timerDiv.appendChild(timer);

  newGameBtn = document.createElement('button');
  newGameBtn.classList.add('new-game-btn');
  gameHead.appendChild(newGameBtn);

  minesDiv = document.createElement('div');
  minesDiv.classList.add('mines-num-div');
  gameHead.appendChild(minesDiv);

  minesNumInput = document.createElement('input');
  minesNumInput.classList.add('mines-num');
  minesNumInput.type = 'number';
  minesDiv.appendChild(minesNumInput);
  minesNumInput.value = 10;

  // FIELD
  gameField = document.createElement('div');
  gameField.classList.add('game-field');
  game.appendChild(gameField);

  flagBtn = document.createElement('button');
  flagBtn.classList.add('flag-btn');
  flagBtn.type = 'submit';
  gameField.appendChild(flagBtn);

  flagCount = document.createElement('div');
  flagCount.classList.add('flag-count');
  gameField.appendChild(flagCount);

  clicksCount = document.createElement('div');
  clicksCount.classList.add('clicks-count');
  gameField.appendChild(clicksCount);

  cellContainer = document.createElement('div');
  cellContainer.classList.add('cell-container');
  gameField.appendChild(cellContainer);

  // STATS
  statDiv = document.createElement('div');
  statDiv.classList.add('statistics-div');
  game.appendChild(statDiv);

  statTitle = document.createElement('h3');
  statTitle.classList.add('stat-title');
  statDiv.appendChild(statTitle);
  statTitle.textContent = 'Statistics';

  statTitles = document.createElement('div');
  statTitles.classList.add('statistics');
  statDiv.appendChild(statTitles);

  statistics = document.createElement('div');
  statistics.classList.add('statistics', 'saved-stat');
  statDiv.appendChild(statistics);

  histDate = document.createElement('div');
  histDate.classList.add('history-date');
  statistics.appendChild(histDate);

  titleDate = document.createElement('h4');
  titleDate.classList.add('hist-title', 'date-hist-title');
  titleDate.textContent = 'date';
  statTitles.appendChild(titleDate);

  histNum = document.createElement('div');
  histNum.classList.add('history-num');
  statistics.appendChild(histNum);

  titleNum = document.createElement('h4');
  titleNum.classList.add('hist-title');
  titleNum.textContent = 'bombs';
  statTitles.appendChild(titleNum);

  histTime = document.createElement('div');
  histTime.classList.add('history-time');
  statistics.appendChild(histTime);

  titleTime = document.createElement('h4');
  titleTime.classList.add('hist-title');
  titleTime.textContent = 'time';
  statTitles.appendChild(titleTime);

  histClicks = document.createElement('div');
  histClicks.classList.add('history-clicks');
  statistics.appendChild(histClicks);

  titleClicks = document.createElement('h4');
  titleClicks.classList.add('hist-title');
  titleClicks.textContent = 'clicks';
  statTitles.appendChild(titleClicks);

  // FINAL APPEND
  document.body.appendChild(main);
  console.log('layout generated');
}

export function generateCells(obj) {
  flagCount.textContent = `Flags put: 0 / Mines left: ${obj.minesCount}`;
  clicksCount.textContent = 'Cell clicks: 0';
  cellContainer.innerHTML = '';
  cellContainer.classList.remove('easy', 'medium', 'hard');
  let num = 0;
  switch (obj.difficulty) {
    case '10':
      num = 100;
      cellContainer.classList.add('easy');
      break;
    case '15':
      num = 225;
      cellContainer.classList.add('medium');
      break;
    case '25':
      num = 625;
      cellContainer.classList.add('hard');
      break;
  }

  for (let i = 1; i <= num; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cellContainer.appendChild(cell);
  }

//   return generateZeroMatrix(+obj.difficulty);
}

export function generateZeroMatrix(obj, n) {
  const matrixJ = [];
  for (let j = 0; j < n; j += 1) {
    const arr = [];
    arr.length = n;
    matrixJ.push(arr);
  }
  obj.matrix = matrixJ;
}
