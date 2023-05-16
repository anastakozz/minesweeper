export function cellClick () {
    console.log('cell clicked');
    this.classList.add('cell-open');
}

export function cellRightClick () {
    console.log('cell Rightclicked');
    if(!this.classList.contains('cell-open')){
        this.classList.toggle('cell-flag');
    }
}