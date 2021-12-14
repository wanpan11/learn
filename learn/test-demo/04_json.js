/* JSON.stringify 是参数的值不能为 undefined 否则会去掉  encodeURIComponent 编码  decodeURIComponent 解码*/
const obj = {
  wanpan: '11',
  undefined_1: null,
  undefined_2: undefined,
};
const str = JSON.stringify(obj);
console.log(str);

// fetch('http://127.0.0.1:8888/')
//   .then(response => console.log(response))
//   .then(data => console.log(data));

fetch('http://127.0.0.1:8888/tcp')
  .then(response => {
    console.log(response);
    return response.json();
  })
  .then(data => console.log(data));
