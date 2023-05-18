function randomise(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateMinesArr (num, firstIndex) {
    let newMinesArr = [];

    function generateIndexes() {
        for (let i = 1; i <= num; i++){
            let ind = randomise(0, (num ** 2 - 1));
            if (!newMinesArr.includes(ind) && ind !== firstIndex){
                newMinesArr.push(ind);
            } else {
                generateIndexes();
            }
        }
    }
    generateIndexes();

    console.log (newMinesArr);

}