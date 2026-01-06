const fs = require('fs');
const path = require('path');

const stream = fs.createWriteStream(path.join(__dirname, 'output.txt'), {
  flags: 'a',
});

stream.write('Hello');
console.log('done');
stream.end();
