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
  return newMinesArr;
}

export function fillMatrix(obj) {
  console.log(obj.minesArr);
  const n = +obj.difficulty;
  for (let b = 0; b < obj.minesArr.length; b += 1) {
    let i = obj.minesArr[b] % n;
    let j = (obj.minesArr[b] - i) / n;
    console.log(`j = ${j} i = ${i}`);
    obj.matrix[j].splice(i, 1, 'b');
    fillNums(obj.matrix, i, j);
  }
  console.log(obj.matrix);
}

function fillNums(matrix, i, j){
for (let n = j - 1; n <= j + 1; n += 1) {
 if (n >= 0 && n < matrix.length) {
    if(!matrix[n][i+1] && i < matrix[j].length - 1){
        matrix[n].splice(i+1, 1, 1);
    } else if (matrix[n][i+1] !== 'b' && i < matrix[j].length - 1){
        matrix[n].splice(i+1, 1, matrix[n][i+1] + 1);
    }

    if(!matrix[n][i]){
        matrix[n].splice(i, 1, 1);
    } else if (matrix[n][i] !== 'b'){
        matrix[n].splice(i, 1, matrix[n][i] + 1);
    }

    if(!matrix[n][i-1] && i >= 1){
        matrix[n].splice(i-1, 1, 1);
    } else if (matrix[n][i-1] !== 'b' && i >= 1){
        matrix[n].splice(i-1, 1, matrix[n][i-1] + 1);
    }
 }
 
  
    
}

  
}
