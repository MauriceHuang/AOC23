const fs = require("fs");

// Read the input file
const inputFile = fs.readFileSync("./input.txt", "utf8");

// Split the file contents by line
const games = inputFile.trim().split("\n");

// Initialize the gameData object
const gameData = {};
for (let i = 0; i < games.length; i++) {
  const game = games[i];
  console.log(game);
  const gameNumber = game.split(" ")[1].slice(0, 1);
  const data = game.split(":").slice(1);

  console.log(gameNumber);
  console.log(data);
}
