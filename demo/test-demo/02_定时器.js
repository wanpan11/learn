// a 被赋值为 定时器的标识ID
var a = setTimeout(() => {
  console.log("111111");
});

console.log(a);

// clearTimeout 清空定时器时 要将定时器ID清空
clearTimeout(a);
a = null;

console.log(a);
