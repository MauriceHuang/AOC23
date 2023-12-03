const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.trim().split("\n");
  const n = lines.length;
  const m = lines[0].length;

  function isSymbol(i, j) {
    if (i < 0 || i >= n || j < 0 || j >= m) {
      return false;
    }
    return lines[i][j] !== "." && !/\d/.test(lines[i][j]);
  }

  let ans = 0;

  for (let i = 0; i < n; i++) {
    let line = lines[i];
    let j = 0;

    while (j < m) {
      let start = j;
      let num = "";
      while (j < m && /\d/.test(line[j])) {
        num += line[j];
        j++;
      }

      if (num === "") {
        j++;
        continue;
      }

      num = parseInt(num);

      // Number ended, look around
      if (isSymbol(i, start - 1) || isSymbol(i, j)) {
        ans += num;
        continue;
      }

      for (let k = start - 1; k <= j; k++) {
        if (isSymbol(i - 1, k) || isSymbol(i + 1, k)) {
          ans += num;
          break;
        }
      }
    }
  }

  console.log(ans);
});
