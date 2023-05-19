function randomise(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateMinesArr(num, size, firstIndex) {
  const newMinesArr = [];
  for (let i = 1; i <= num; i++) {
    function generateIndexes() {
      const ind = randomise(0, (size * size - 1));
      if (!newMinesArr.includes(ind) && ind !== firstIndex) {
        newMinesArr.push(ind);
      } else {
        generateIndexes();
      }
    }

    generateIndexes();
  }
  //   console.log(newMinesArr);
  return newMinesArr;
}

export function fillMatrix(obj) {
  console.log(obj.minesArr);
  const n = +obj.difficulty;
  for (let b = 0; b < obj.minesArr.length; b += 1) {
    const i = obj.minesArr[b] % n;
    const j = (obj.minesArr[b] - i) / n;
    console.log(`j = ${j} i = ${i}`);
    obj.matrix[j].splice(i, 1, 'bomb');
  }
  console.log(obj.matrix);
}
