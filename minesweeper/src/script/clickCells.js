function checkCell(matrix, arr, i, j) {
  const ind = j * matrix.length + i;
  if (!arr[ind].classList.contains('cell-open') && !arr[ind].classList.contains('cell-flag')) {
    if (matrix[j][i] && matrix[j][i] !== 'b') {
      arr[ind].classList.add('cell-open', `cell-${matrix[j][i]}`);
      arr[ind].textContent = matrix[j][i];
    } else if (!matrix[j][i]) {
      arr[ind].classList.add('cell-open');

      if (i > 0 && j > 0 && i < matrix.length - 1 && j < matrix.length - 1) {
        checkCell(matrix, arr, i - 1, j);
        checkCell(matrix, arr, i, j - 1);
        checkCell(matrix, arr, i - 1, j - 1);
        checkCell(matrix, arr, i + 1, j);
        checkCell(matrix, arr, i, j + 1);
        checkCell(matrix, arr, i + 1, j + 1);
        checkCell(matrix, arr, i - 1, j + 1);
        checkCell(matrix, arr, i + 1, j - 1);
      } else if (i === 0 && j > 0 && j < matrix.length - 1) {
        checkCell(matrix, arr, i, j - 1);
        checkCell(matrix, arr, i + 1, j);
        checkCell(matrix, arr, i, j + 1);
        checkCell(matrix, arr, i + 1, j + 1);
        checkCell(matrix, arr, i + 1, j - 1);
      } else if (i === matrix.length - 1 && j > 0 && j < matrix.length - 1) {
        checkCell(matrix, arr, i - 1, j);
        checkCell(matrix, arr, i, j - 1);
        checkCell(matrix, arr, i - 1, j - 1);
        checkCell(matrix, arr, i, j + 1);
        checkCell(matrix, arr, i - 1, j + 1);
      } else if (j === 0 && i > 0 && i < matrix.length - 1) {
        checkCell(matrix, arr, i - 1, j);
        checkCell(matrix, arr, i + 1, j);
        checkCell(matrix, arr, i, j + 1);
        checkCell(matrix, arr, i + 1, j + 1);
        checkCell(matrix, arr, i - 1, j + 1);
      } else if (j === matrix.length - 1 && i > 0 && i < matrix.length - 1) {
        checkCell(matrix, arr, i - 1, j);
        checkCell(matrix, arr, i, j - 1);
        checkCell(matrix, arr, i - 1, j - 1);
        checkCell(matrix, arr, i + 1, j);
        checkCell(matrix, arr, i + 1, j - 1);
      } else if (i === 0 && j === 0) {
        checkCell(matrix, arr, i + 1, j);
        checkCell(matrix, arr, i, j + 1);
        checkCell(matrix, arr, i + 1, j + 1);
      } else if (i === 0 && j === matrix.length - 1) {
        checkCell(matrix, arr, i, j - 1);
        checkCell(matrix, arr, i + 1, j);
        checkCell(matrix, arr, i + 1, j - 1);
      } else if (i === matrix.length - 1 && j === 0) {
        checkCell(matrix, arr, i - 1, j);
        checkCell(matrix, arr, i, j + 1);
        checkCell(matrix, arr, i - 1, j + 1);
      } else if (i === matrix.length - 1 && j === matrix.length - 1) {
        checkCell(matrix, arr, i - 1, j);
        checkCell(matrix, arr, i, j - 1);
        checkCell(matrix, arr, i - 1, j - 1);
      }
    }
  }
}

export function openCell(evt, index, matrix, arr) {
  const i = index % matrix.length;
  const j = (index - i) / matrix.length;
  const cellClicked = evt.currentTarget;
  if (cellClicked.classList.contains('cell-flag')) {
    return null;
  }

  if (matrix[j][i] === 'b') {
    cellClicked.classList.add('cell-bomb');
    return 'gameover';
  }
  checkCell(matrix, arr, i, j);
  // console.log(`cell opened on index ${index}`);
  return true;
}

export function putFlag(evt, index, mines) {
  if (!evt.currentTarget.classList.contains('cell-open')) {
    evt.currentTarget.classList.toggle('cell-flag');
    // console.log(`flag toggled on index ${index}`);
  }
  const flagCount = document.querySelector('.flag-count');
  const flaggedCells = document.querySelectorAll('.cell-flag');
  flagCount.textContent = `Flags put: ${flaggedCells.length} / Mines left: ${mines - flaggedCells.length}`;
}
