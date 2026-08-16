const fs = require("fs");
const path = require("path");

const start = Date.now();

const promises = [];
// log thread pool size
console.log("thread pool size:", process.env.UV_THREADPOOL_SIZE);
async function main() {
  const file = path.join(__dirname, "files", "big.txt");
  const start = Date.now();

  for (let i = 0; i < 10; i++) {
    promises.push(issueRead(file));
  }
  console.log(promises);

  Promise.all(promises).then((a) =>
    console.log("Total:", Date.now() - start, "ms"),
  );
}

main();

function issueRead(p) {
  return new Promise((resolve, reject) => {
    fs.readFile(p, (err, data) => {
      if (err) reject(err);
      resolve("done", Date.now() - start);
    });
  });
}
