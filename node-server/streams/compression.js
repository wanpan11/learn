const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

// 创建示例文件
const inputFile = path.join(__dirname, 'input.txt');
const compressedFile = path.join(__dirname, 'input.txt.gz');
const decompressedFile = path.join(__dirname, 'output.txt');

fs.writeFileSync(inputFile, 'This is a test file for compression.\nIt contains multiple lines of text.\nCompression reduces file size.');

// 压缩文件
const gzip = zlib.createGzip();
const inputStream = fs.createReadStream(inputFile);
const compressedStream = fs.createWriteStream(compressedFile);

inputStream.pipe(gzip).pipe(compressedStream);

compressedStream.on('finish', () => {
  console.log('Compression complete');

  // 解压缩文件
  const gunzip = zlib.createGunzip();
  const compressedReadStream = fs.createReadStream(compressedFile);
  const decompressedStream = fs.createWriteStream(decompressedFile);

  compressedReadStream.pipe(gunzip).pipe(decompressedStream);

  decompressedStream.on('finish', () => {
    console.log('Decompression complete');

    // 验证内容
    const original = fs.readFileSync(inputFile, 'utf8');
    const decompressed = fs.readFileSync(decompressedFile, 'utf8');

    console.log('Original and decompressed match:', original === decompressed);

    // 清理文件
    fs.unlinkSync(inputFile);
    fs.unlinkSync(compressedFile);
    fs.unlinkSync(decompressedFile);
  });
});