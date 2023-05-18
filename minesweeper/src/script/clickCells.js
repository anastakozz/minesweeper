export function openCell(evt, index) {
  if (!evt.currentTarget.classList.contains('cell-flag')) {
    evt.currentTarget.classList.add('cell-open');
    console.log(`cell opened on index ${index}`);
  }
}

export function putFlag(evt, index) {
  if (!evt.currentTarget.classList.contains('cell-open')) {
    evt.currentTarget.classList.toggle('cell-flag');
    console.log(`flag toggled on index ${index}`);
  }
  const flagCount = document.querySelector('.flag-count');
  const flaggedCells = document.querySelectorAll('.cell-flag');
  flagCount.textContent = `Flags put: ${flaggedCells.length}`;
}
