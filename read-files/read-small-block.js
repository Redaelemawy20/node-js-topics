const fs = require("fs");
const path = require("path");
const { constants } = require("buffer");

console.log(constants);
console.log("max buffer size in gb", constants.MAX_LENGTH / 1024 / 1024 / 1024);
const start = Date.now();

console.log(process.version);
console.log(process.arch);
console.log(constants.MAX_LENGTH);
const promises = [];

async function main() {
  const file = path.join(__dirname, "files", "small.txt");
  const start = Date.now();
  fs.readFile(file, (err, data) => {
    if (err) throw err;
    console.log(data.toString());
    console.log("File read successfully in ", Date.now() - start, "ms");
  });
  console.log("File read started");

  console.log("block main thread for 10 seconds");
  for (let i = 0; new Date().getTime() - start < 10000; i++);
}

main();
