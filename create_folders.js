const fs = require('fs');

for (let i =1;i<=25;i++){
const folderName = `day${i}`;
fs.mkdirSync(folderName);
}
