const fs = require("node:fs");
const fileContent = fs.readFileSync("input.txt", "utf8");
const linesArray = fileContent.split("\n");

let sum = 0;
const hiddenNumberArray = [];
for (let i = 0; i < linesArray.length; i++) {
  //print out each of the array's length
  console.log(linesArray[i]);

  for (let j = 0; j < linesArray[i].length; j++) {
    //print the first number of each line that matches the numbersArray
    if (!isNaN(linesArray[i][j])) {
      hiddenNumberArray[i] = linesArray[i][j];
      break;
    }
  }
  for (let k = linesArray[i].length - 1; i >= 0; k--) {
    if (!isNaN(linesArray[i][k])) {
      hiddenNumberArray[i] = hiddenNumberArray[i] + linesArray[i][k];
      break;
    }
  }
}
for (let i = 0; i < hiddenNumberArray.length; i++) {
  sum = sum + parseInt(hiddenNumberArray[i], 10);
}

console.log(hiddenNumberArray.length);
console.log(sum);
