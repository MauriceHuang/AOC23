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
function checkSubGames(gameData, colorLimits) {
  for (const [gameNumber, game] of Object.entries(gameData)) {
    let isValidGame = true;

    for (const subGame of Object.values(game)) {
      if (subGame === game.total) continue; // Skip the total

      const red = subGame.red || 0;
      const green = subGame.green || 0;
      const blue = subGame.blue || 0;

      if (
        red > colorLimits.red ||
        green > colorLimits.green ||
        blue > colorLimits.blue
      ) {
        isValidGame = false;
        break;
      }
    }

    if (isValidGame) {
      validGames.push(parseInt(gameNumber));
    }
  }
}

checkSubGames(gameData, colorLimits);
// console.log("Games with total color counts within limits:", validGames);

sum = 0;
validGames.forEach((game) => {
  sum += game;
});
console.log(sum);

function addMaxColorCounts(gameData) {
  Object.entries(gameData).forEach(([gameNumber, game]) => {
    // Initialize max counts for each color
    const maxCounts = { red: 0, green: 0, blue: 0 };

    // Iterate over each subgame to find the max counts
    Object.values(game).forEach((subGame) => {
      if (subGame === game.total) return; // Skip the total

      maxCounts.red = Math.max(maxCounts.red, subGame.red || 0);
      maxCounts.green = Math.max(maxCounts.green, subGame.green || 0);
      maxCounts.blue = Math.max(maxCounts.blue, subGame.blue || 0);
    });

    // Add the max counts to the game object
    gameData[gameNumber].maxCounts = maxCounts;
  });
}

// Call the function to add max color counts to each game
addMaxColorCounts(gameData);

console.log("Updated gameData with max color counts:", gameData);

function calculateTotalPower(gameData) {
  let totalPower = 0;

  Object.values(gameData).forEach((game) => {
    if (!game.maxCounts) return; // Skip if maxCounts is not defined

    // Calculate the power of the game
    const power =
      game.maxCounts.red * game.maxCounts.green * game.maxCounts.blue;
    game.power = power;

    // Add to the total power
    totalPower += power;
  });

  return totalPower;
}

// First, ensure that maxCounts are added to each game
addMaxColorCounts(gameData);

// Then, calculate the total power
const totalPower = calculateTotalPower(gameData);

console.log("Total Power of all games:", totalPower);
console.log("Updated gameData with power:", gameData);
