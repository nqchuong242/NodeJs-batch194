const fs = require('node:fs');

fs.rename('expand.txt','renamed.txt', function (err) {
  if (err) throw err;
  console.log('File Renamed!');
});