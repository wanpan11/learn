const fs = require("fs");

const data_1 = fs.readFileSync("./data_1.txt").toString();
const arr_1 = data_1.split("\n");

const data_2 = fs.readFileSync("./data_2.txt").toString();
const arr_2 = data_2.split("\n");

const result = [];

for (let i = 0; i < arr_1.length; i++) {
  const reg = /\t/g;
  const key = arr_1[i].replace(reg, "");
  const value = arr_2[i].replace(reg, "");
  result.push({ key, value });
}

console.log(result);
