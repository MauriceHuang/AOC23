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

let currentIndex = 0;
let foundMatch = false;
let matchedSubstring = "";

while (currentIndex < inputString.length && !foundMatch) {
  for (const key of Object.keys(criteria)) {
    if (inputString.startsWith(key, currentIndex)) {
      foundMatch = true;
      matchedSubstring = key;
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
} else {
  replacedString = inputString;
}

//work in reverse

console.log(replacedString);
