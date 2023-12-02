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

const inputString = "eightwothree";

let currentIndex = inputString.length - 1;
let replacedString = "";

while (currentIndex >= 0) {
  let matchFound = false;
  let matchedKey = "";

  for (const key in criteria) {
    const currentSubstring = inputString.substring(
      currentIndex - key.length + 1,
      currentIndex + 1
    );
    if (currentSubstring === key) {
      matchedKey = key;
      matchFound = true;
      break;
    }
  }

  if (matchFound) {
    replacedString = criteria[matchedKey] + replacedString;
    currentIndex -= matchedKey.length;
  } else {
    replacedString = inputString[currentIndex] + replacedString;
    currentIndex--;
  }
}

console.log(replacedString);
