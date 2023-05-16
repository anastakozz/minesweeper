export function openCell (evt) {
    if(!evt.currentTarget.classList.contains('cell-flag')){
        evt.currentTarget.classList.add('cell-open');
    }
}

export function putFlag (evt) {
    if(!evt.currentTarget.classList.contains('cell-open')){
        evt.currentTarget.classList.toggle('cell-flag');
    }
}