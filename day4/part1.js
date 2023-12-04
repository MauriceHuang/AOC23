const { count } = require("console");
const fs = require("fs");
const { get } = require("http");

fs.readFile("./input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  let total = 0;
  const lines = data.trim().split("\n");

  let firstLine = lines[0];
  for (let i = 0; i < lines.length; i++) {
    total = total + getArrays(lines[i]);
  }
  return total;
});

//helper functions
const getArrays = (line) => {
  const startIndex = line.indexOf(":") + 1;
  const breakIndex = line.indexOf("|");
  const fistNumberString = line
    .substring(startIndex + 1, breakIndex)
    .trim()
    .split(" ")
    .filter((num) => num)
    .map((num) => parseInt(num, 10));
  const lastNumberString = line
    .substring(breakIndex + 2)
    .trim()
    .split(" ")
    .filter((num) => num)
    .map((num) => parseInt(num, 10));
  let counter = 0;
  for (let i = 0; i < fistNumberString.length; i++) {
    for (let j = 0; j < lastNumberString.length; j++) {
      if (fistNumberString[i] === lastNumberString[j]) {
        counter = counter + 1;
      }
    }
  }
  if (counter === 0) {
    return 0;
  } else {
    return 2 ** (counter - 1);
  }
};
