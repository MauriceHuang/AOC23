const fs = require("fs");

const input = fs.readFileSync("./inputTest.txt", "utf-8").split("\n");

console.log(input[2][26]);
