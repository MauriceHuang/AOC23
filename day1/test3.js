const fs = require("node:fs");
const fileContent = fs.readFileSync("input.txt", "utf8");
const linesArray = fileContent.split("\n");
let sum = 0;
const hiddenNumberArray = [];
const actualNumberArray = [];
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

function replaceString(inputString) {
  let currentIndex = 0;
  let foundMatch = false;
  let matchedSubstring = "";

  while (currentIndex < inputString.length && !foundMatch) {
    for (const key of Object.keys(criteria)) {
      if (inputString.startsWith(key, currentIndex)) {
        foundMatch = true;
        matchedSubstring = key;
        break; // Break out of the loop once a match is found
      }
    }
    currentIndex++;
  }

  let replacedString;

  if (foundMatch) {
    replacedString = inputString.replace(
      matchedSubstring,
      criteria[matchedSubstring]
    );
    // Call the function recursively with the updated string
    return replaceString(replacedString);
  } else {
    return inputString;
  }
}

// console.log(replacedString); // Expected output: 823
for (let i = 0; i < linesArray.length; i++) {
  const replacedString = replaceString(linesArray[i]);

  hiddenNumberArray[i] = replacedString;
}

console.log(hiddenNumberArray);
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
console.log(linesArray, actualNumberArray);
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
