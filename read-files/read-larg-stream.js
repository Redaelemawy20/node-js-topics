const fs = require("fs");
const path = require("path");

// process.env.UV_THREADPOOL_SIZE = 2;

const file = path.join(__dirname, "files", "big.txt");
const start = Date.now();
const reads = [];

for (let i = 0; i < 4; i++) {
  reads.push(readStream(file, i));
}

Promise.all(reads).then(() => {
  console.log("total time:", Date.now() - start, "ms");
});

function readStream(file, index) {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(file);
    let size = 0;

    stream.on("data", (chunk) => {
      size += chunk.length;
    });

    stream.on("end", () => {
      console.log(`file${index + 1} ended in`, Date.now() - start, "ms");
      console.log(`file${index + 1} size:`, size / 1024 / 1024 / 1024, "GB");
      resolve();
    });

    stream.on("error", reject);
  });
}
