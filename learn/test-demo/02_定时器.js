// a 被复制为 定时器的标识ID
var a = setTimeout(() => {
  console.log('111111');
});

console.log(a);

clearTimeout(a);
a = null;

console.log(a);

/* 
  clearTimeout 清空定时器时 要将定时器ID清空
*/
