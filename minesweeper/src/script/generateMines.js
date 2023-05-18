function randomise(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateMinesArr(num, firstIndex) {
  const newMinesArr = [];

  for (let i = 1; i <= num; i++) {
    function generateIndexes() {
      const ind = randomise(0, (num ** 2 - 1));
      if (!newMinesArr.includes(ind) && ind !== firstIndex) {
        newMinesArr.push(ind);
      } else {
        generateIndexes();
        console.log('recursion');
      }
    }

    generateIndexes();
  }
  console.log(newMinesArr);
}
