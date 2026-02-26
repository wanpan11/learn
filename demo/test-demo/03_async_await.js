/* ============================= async/await ============================================================= */
// async 默认返回 Promise 对象
// 当async 里有await时 返回 pending 状态的 Promise
// 没有的话 返回 fulfilled 状态的 Promise
async function test_1() {
  return 1000;
}
async function test() {
  const a = await test_1();
}
test().then((feed) => {
  console.log(feed);
});

// await 会将后面的表达式包装成 Promise 对象，如果后面表达式本身就是 Promise 对象 就直接返回该对象的结果
function test_2() {
  return 1000;
}
async function text_await() {
  console.log("[ text_await ] ===>");
  const data = await test_2();
  console.log("[ data ] ===>", data);
  return data;
}
text_await();

/* ============================= Promise ============================================================= */
// Promise.then() 会返回 Promise 对象，且 then() 方法中的回调函数会在 Promise 对象的状态改变时被调用
const a = new Promise((res) => {
  res(1);
});

// 任务一
// a.then(feed => {
//   console.log(feed);
// }).then(feed => {
//   console.log(feed);
// });
// // 任务二
// a.then(feed => {
//   console.log(feed);
// }).then(feed => {
//   console.log(feed);
// });

/* ============================= Generator ============================================================= */
// Generator 函数
// Generator对象 像是一个方法集合 每个yield域 就是集合中的一个方法（子集们 被嵌套在一个公共方法里 所以每个子集都可以访问到其它子集的变量）
// 每次调用 next 方法就是执行下一个 yield域里的方法
function* mengmeng(param) {
  const a = yield param;
  console.log("a", a);
  const b = yield a + 1;
  yield b;
}
const fun = mengmeng(1);
console.log(fun.next());
console.log(fun.next(1));
console.log(fun.next(2));

/* ============================= Symbol.iterator ============================================================= */
function getRawType(target) {
  return Object.prototype.toString.call(target).slice(8, -1);
}
function __createArrayIterable(arr) {
  if (typeof Symbol !== "function" || !Symbol.iterator) return {};
  if (getRawType(arr) !== "Array") throw new Error("it must be Array");

  const iterable = {};
  iterable[Symbol.iterator] = () => {
    arr.length++;
    const iterator = {
      next: () => ({ value: arr.shift(), done: arr.length <= 0 }),
    };
    return iterator;
  };

  return iterable;
}

// const iterable = __createArrayIterable(["人月", "神话"]);
// const it = iterable[Symbol.iterator]();

// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
