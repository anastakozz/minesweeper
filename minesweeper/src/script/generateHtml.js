/**
 * Creates basic html layout for minesweeper
 *
 * @return {html structure}
 */



let main,
  wrapper,
  mainTitle,
  flagExpl,
  game,
  gameSetup,
  gameHead,
  gameField,
  statDiv,
  btnDiv,
  soundBtn,
  themeBtn,
  selectSize,
  opt1,
  opt2,
  opt3,
  timerDiv,
  timer,
  newGameBtn,
  minesDiv,
  minesNumInput,
  flagBtn,
  cellContainer,
  statTitle,
  statistics,
  histNum,
  histDate,
  histTime,
  histClicks,
  titleNum,
  titleDate,
  titleTime,
  titleClicks;


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

    //SETUP
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

    //HEAD
    gameHead = document.createElement('div');
    gameHead.classList.add('game-head');
    game.appendChild(gameHead);

    timerDiv = document.createElement('div');
    timerDiv.classList.add('timer-div');
    gameHead.appendChild(timerDiv);

    timer = document.createElement('span');
    timer.classList.add('timer');
    timer.textContent = "0:00";
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

    //FIELD
    gameField = document.createElement('div');
    gameField.classList.add('game-field');
    game.appendChild(gameField);

    flagBtn = document.createElement('button');
    flagBtn.classList.add('flag-btn');
    flagBtn.type = 'submit';
    gameField.appendChild(flagBtn);

    cellContainer = document.createElement('div');
    cellContainer.classList.add('cell-container');
    gameField.appendChild(cellContainer);

    //STATS
    statDiv = document.createElement('div');
    statDiv.classList.add('statistics-div');
    game.appendChild(statDiv);

    statTitle = document.createElement('h3');
    statTitle.classList.add('stat-title');
    statDiv.appendChild(statTitle);

    statistics = document.createElement('div');
    statistics.classList.add('statistics');
    statDiv.appendChild(statistics);

    histNum = document.createElement('div');
    histNum.classList.add('history-num');
    statistics.appendChild(histNum);

    titleNum = document.createElement('h4');
    titleNum.classList.add('hist-title');
    titleNum.textContent = 'num'
    histNum.appendChild(titleNum);

    histDate = document.createElement('div');
    histDate.classList.add('history-date');
    statistics.appendChild(histDate);

    titleDate = document.createElement('h4');
    titleDate.classList.add('hist-title');
    titleDate.textContent = 'date';
    histDate.appendChild(titleDate);

    histTime = document.createElement('div');
    histTime.classList.add('history-time');
    statistics.appendChild(histTime);

    titleTime = document.createElement('h4');
    titleTime.classList.add('hist-title');
    titleTime.textContent = 'time';
    histTime.appendChild(titleTime);

    histClicks = document.createElement('div');
    histClicks.classList.add('history-clicks');
    statistics.appendChild(histClicks);

    titleClicks = document.createElement('h4');
    titleClicks.classList.add('hist-title');
    titleClicks.textContent = 'clicks';
    histClicks.appendChild(titleClicks);

//FINAL APPEND
    document.body.appendChild(main);
    console.log('layout generated');
}

export function generateCells(obj) {
    let num = 0;
    switch (obj.difficulty) {
        case 'easy':
            num = 100;
            cellContainer.classList.add('easy');
            break;
        case 'medium':
            num = 225;
            break;
        case 'hard':
            num = 625;
    }

    for (let i = 1; i <= num; i++){
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cellContainer.appendChild(cell);
    }
}