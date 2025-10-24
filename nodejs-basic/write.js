const fs = require('fs');

const data = 'Đây là nội dung mới';
fs.writeFile('output.txt', data, 'utf8', (err) => {
  if (err) {
    return console.error('Có lỗi xảy ra khi ghi file:', err);
  }
  console.log('Dữ liệu đã được ghi vào file.');
});