const path = require('node:path');

/*
//basename ?
// lấy cái cuối cùng của dưới này
const filename = path.basename('/Users/Refsnes/demo_path.js');
console.log('filename = ',filename);

//ý nghĩa là rã cái đường dẫn ở dưới ra dưới dạng 1 obj 
const fileInfo = path.parse('/Users/Refsnes/demo_path.js');
console.log('fileInfo =',fileInfo)

const newFileName = `${fileInfo.name}-${Date.now()}${fileInfo.ext}`;
console.log('newFileName = ',newFileName)

///cập nhật tên file mới theo biến trên

const fs = require('node:fs');

fs.rename('file.txt',`${newFileName}`, (err) => {
  if (err) throw err;
  console.log('File Renamed!');
}); */

//join hàm nối
const fullPath = path.join('/sub','/folder','file.txt')
console.log('fullPath = ',fullPath);