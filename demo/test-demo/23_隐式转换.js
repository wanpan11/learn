const str = "";
const obj = {};
const arr = [];

console.log(str.__proto__);
console.log(obj.__proto__);
console.log(arr.__proto__);

console.log("str ===> ", str.valueOf());
console.log("obj ===> ", obj.valueOf());
console.log("arr ===> ", arr.valueOf());

console.log(globalThis);
