function foo() {
  // debugger 查看调用栈
  console.log("arguments", arguments);
  console.log(111);
}

function bar() {
  return foo();
}

function baz() {
  return bar();
}

baz();

/* ========================================= */

// if (typeof baz === "function") {
//   console.log();
// }

/*  redux compose ========================================= */
const fun_0 = () => {
  console.log(0);
};
const fun_1 = () => {
  console.log(1);
};
const fun_2 = () => {
  console.log(2);
};

const arr = [fun_0, fun_1, fun_2];

// 通过 reduce 嵌套函数调用
const c = arr.reduce((a, b) => {
  // console.log('reduce');
  return (...args) => a(b(...args));
});

console.log(c);
console.log(c());
