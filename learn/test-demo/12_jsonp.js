function aaa(params) {
  let oo = 99;
  bbb(1);
  console.log("a");

  const a_2 = () => {
    // debugger;
    console.log(oo);
  };
  a_2();
  console.log("a end");
}
function bbb(params) {
  ccc(2);
  console.log("start b");
}
function ccc(params) {
  dddd(3);
  console.log("start c");
}
function dddd(params) {
  // debugger;
  console.log("start d");
}

var wanpan = "wan";
aaa(0);

// 执行堆栈

const obj = { name: "wanpan" };

const obj_1 = { ...obj };

// debugger;
console.log(obj.__proto__);
console.log(obj === obj_1);
