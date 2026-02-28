const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// 创建示例文件
const inputFile = path.join(__dirname, 'plain.txt');
const encryptedFile = path.join(__dirname, 'encrypted.txt');
const decryptedFile = path.join(__dirname, 'decrypted.txt');

fs.writeFileSync(inputFile, 'This is sensitive data that needs encryption.');

// 加密
const algorithm = 'aes-256-cbc';
const password = 'mySecretPassword';
const key = crypto.scryptSync(password, 'salt', 32);
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv(algorithm, key, iv);
const inputStream = fs.createReadStream(inputFile);
const encryptedStream = fs.createWriteStream(encryptedFile);

inputStream.pipe(cipher).pipe(encryptedStream);

encryptedStream.on('finish', () => {
  console.log('Encryption complete');

  // 解密
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const encryptedReadStream = fs.createReadStream(encryptedFile);
  const decryptedStream = fs.createWriteStream(decryptedFile);

  encryptedReadStream.pipe(decipher).pipe(decryptedStream);

  decryptedStream.on('finish', () => {
    console.log('Decryption complete');

    // 验证
    const original = fs.readFileSync(inputFile, 'utf8');
    const decrypted = fs.readFileSync(decryptedFile, 'utf8');

    console.log('Original and decrypted match:', original === decrypted);

    // 清理
    fs.unlinkSync(inputFile);
    fs.unlinkSync(encryptedFile);
    fs.unlinkSync(decryptedFile);
  });
});