const fs = require("node:fs");
const fileContent = fs.readFileSync("input.txt", "utf8");
const linesArray = fileContent.split("\n");

const criteria = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

let sum = 0;
const hiddenNumberArray = [];
const actualNumberArray = [];
for (let i = 0; i < linesArray.length; i++) {
  const line = linesArray[i];
  //   //   console.log(line);
  let replacedString = line;
  const keys = Object.keys(criteria).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    const regex = new RegExp(key, "gi");
    replacedString = replacedString.replace(regex, (match) => {
      if (replacedString === match || isNaN(replacedString)) {
        return criteria[match.toLowerCase()];
      }
      // Exclude matches that are part of longer composite numbers

      return match;
    });
  }
  hiddenNumberArray[i] = replacedString;
  //   console.log("all the array", hiddenNumberArray);

  //   const replacedString = line.replace(
  //     /([a-z]+)(\d+)/gi,
  //     (match, word, number) => {
  //       const mappedNumber = numberMapping[word.toLowerCase()] || word;
  //       return mappedNumber + number;
  //     }
  //   );
  //   console.log(replacedString);
  //   hiddenNumberArray[i] = replacedString;
}
console.log(hiddenNumberArray);
// replace match letter in numberMapping with the respective number.
for (let i = 0; i < hiddenNumberArray.length; i++) {
  //print out each of the array's length

  for (let j = 0; j < hiddenNumberArray[i].length; j++) {
    //print the first number of each line that matches the numbersArray
    if (!isNaN(hiddenNumberArray[i][j])) {
      actualNumberArray[i] = hiddenNumberArray[i][j];
      break;
    }
  }
  for (let k = hiddenNumberArray[i].length - 1; i >= 0; k--) {
    if (!isNaN(hiddenNumberArray[i][k])) {
      actualNumberArray[i] = actualNumberArray[i] + hiddenNumberArray[i][k];
      break;
    }
  }
}
console.log(actualNumberArray);
const filePath = "output.txt";

fs.writeFile(filePath, actualNumberArray.join("\n"), (err) => {
  if (err) {
    console.error("Error writing to file:", err);
    return;
  }

  console.log("Array successfully written to file:", filePath);
});

for (let i = 0; i < actualNumberArray.length; i++) {
  sum = sum + parseInt(actualNumberArray[i], 10);
}

console.log(sum);
