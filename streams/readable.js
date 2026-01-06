const fs = require('fs');
const path = require('path');

const readable = fs.createReadStream(path.join(__dirname, 'output.txt'), {
  encoding: 'utf8',
  highWaterMark: 6, // bytes (≈ characters for utf8 text)
});

readable.on('data', (chunk) => {
  console.log('Chunk:', chunk, '\n');
});

readable.on('end', () => {
  console.log('Finished reading file');
});

readable.on('error', (err) => {
  console.error(err);
});
