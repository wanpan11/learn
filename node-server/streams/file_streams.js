const fs = require('fs');
const path = require('path');

// 创建一个示例文件
const filePath = path.join(__dirname, 'example.txt');
fs.writeFileSync(filePath, 'This is a test file.\nIt has multiple lines.\nEnd of file.');

// 使用流读取文件
const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

readStream.on('data', (chunk) => {
  console.log('Read chunk:', chunk);
});

readStream.on('end', () => {
  console.log('File read complete');

  // 使用流写入文件
  const writeStream = fs.createWriteStream(path.join(__dirname, 'output.txt'));
  writeStream.write('Writing to file using streams.\n');
  writeStream.write('This is line 2.\n');
  writeStream.end('End of writing.');

  writeStream.on('finish', () => {
    console.log('File write complete');

    // 清理文件
    fs.unlinkSync(filePath);
    fs.unlinkSync(path.join(__dirname, 'output.txt'));
  });
});