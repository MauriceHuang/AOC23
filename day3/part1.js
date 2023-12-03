const fs = require("fs");

const input = fs.readFileSync("./inputTest.txt", "utf-8").split("\n");

// number of columns , input[0].length
const c = input[0].length;
const r = input.length;
console.log("input size", c, r);

//helper function
function isDigit(character) {
  return !isNaN(character) && character !== " ";
}

function isSymbol(character) {
  if (character === ".") return false;
  var symbolPattern = /[^\w\s]/;
  return symbolPattern.test(character);
}

let num = [];
let answer = 0;
let numLength = 0;
for (let i = 0; i < r; i++) {
  for (let j = 0; j < c; j++) {
    if (isDigit(input[i][j])) {
      numLength++;
      //   continue;
    } else if (numLength > 0) {
      let number = input[i].slice(j - numLength, j);
      console.log("number is :", number, " at ", i, j - numLength);

      //check if any of the adjacent character is a symbol before pushing the number into the num array
      let r0;
      let c0;
      //if it is in first row, then there is no need to check for the row above
      if (i == 0 && j - 1 >= 0) {
        r0 = i;
        c0 = j - numLength - 1;
        console.log(number, "at ", "r, c", r0, c0);
        for (let k = r0; k <= r0 + 1; k++) {
          for (let l = c0; l <= c0 + numLength + 1; l++) {
            console.log("k, l", k, l);
            if (k > r - 1 || l > c - 1) break;
            console.log(input[k][l], "k, l", k, l);
            if (isSymbol(input[k][l])) {
              console.log(
                "symbol",
                input[k][j],
                " for: ",
                number,
                " found at ",
                k,
                l
              );
              num.push(number);
              answer = answer + parseInt(number, 10);
              break;
            }
          }
        }
      }

      if (i - 1 >= 0 && j - 1 >= 0) {
        r0 = i - 1;
        c0 = j - numLength - 1;
        console.log(number, "at ", "r, c", r0, c0);
        for (let k = r0; k <= r0 + 2; k++) {
          for (let l = c0; l <= c0 + numLength + 1; l++) {
            console.log("k, l", k, l);
            if (k > r - 1 || l > c - 1) break;
            console.log(input[k][l], "k, l", k, l);
            if (isSymbol(input[k][l])) {
              console.log(
                "symbol",
                input[k][j],
                " for: ",
                number,
                " found at ",
                k,
                l
              );
              num.push(number);
              answer = answer + parseInt(number, 10);
              break;
            }
          }
        }
      }

      numLength = 0;
    }
    // j = j + numLength;
  }
}

console.log("num", num);

console.log("answer", answer);
console.log("numLength", numLength);
