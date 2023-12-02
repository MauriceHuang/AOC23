const fs = require("fs");

// Read the input file
const inputFile = fs.readFileSync("./input.txt", "utf8");
// console.log(inputFile);

// Split the file contents by line
const games = inputFile.trim().split("\n");
// console.log(games);

const parseData = (data) => {
  const gameData = {};
  const games = data.trim().split("\n");

  games.forEach((game) => {
    const [gameTitle, roundsData] = game.split(": ");
    const gameNumber = parseInt(gameTitle.split(" ")[1], 10);
    const rounds = roundsData.split("; ");

    gameData[gameNumber] = {};
    const total = { blue: 0, red: 0, green: 0 };

    rounds.forEach((round, index) => {
      const counts = round.split(", ");
      gameData[gameNumber][index + 1] = {};

      counts.forEach((count) => {
        const [number, color] = count.split(" ");
        gameData[gameNumber][index + 1][color] = parseInt(number, 10);
        total[color] += parseInt(number, 10);
      });
    });

    gameData[gameNumber]["total"] = total;
  });

  return gameData;
};
const gameData = parseData(inputFile);
console.log(gameData);
const colorLimits = { red: 12, green: 13, blue: 14 };
const validGames = [];

// Function to check if a game's total is within the specified color limits
function checkGameTotals(gameData, colorLimits) {
  for (const [gameNumber, game] of Object.entries(gameData)) {
    const { total } = game;
    if (
      total.red <= colorLimits.red &&
      total.green <= colorLimits.green &&
      total.blue <= colorLimits.blue
    ) {
      validGames.push(parseInt(gameNumber));
    }
  }
}

checkGameTotals(gameData, colorLimits);
console.log("Games with total color counts within limits:", validGames);

sum = 0;
validGames.forEach((game) => {
  sum += game;
});
console.log(sum);
