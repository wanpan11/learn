/* async 函数返回值是 Promise 对象 */
async function test_1(params) {
  // return params // reslove;
  throw new Error(params); // reject;
}
async function test(params) {
  // console.log(test_1(params));
  try {
    const a = await test_1(params);
    console.log(a);
  } catch (err) {
    console.log(err.message);
  }
  console.log('=============================================');
}
// test(6);

const a = new Promise((res, rej) => {
  console.log(res(1));
});
/* 
Promise.then() 
会执行 该队列下得所有回调
会返回新的 Promise 实例 
*/
a.then(feed => {
  console.log(feed);
}).then(feed => {
  console.log(feed);
});

a.then(feed => {
  console.log(feed);
}).then(feed => {
  console.log(feed);
});

/* Generator 函数
    Generator对象 像是一个方法集合 每个yield域 就是集合中的一个方法（子集们 被嵌套在一个公共方法里 所以每个子集都可以访问到其它子集的变量）
	每次调用next 方法就是执行下一个 yield域里的方法 
*/
function* mengmeng(param) {
  let a = yield param;
  let b = yield a + 1;
  yield b;
}
// const fun = mengmeng(1);
// console.log(fun.next());
// console.log(fun.next(1));
// console.log(fun.next(2));

const getRawType = target =>
  Object.prototype.toString.call(target).slice(8, -1);

const __createArrayIterable = arr => {
  if (typeof Symbol !== 'function' || !Symbol.iterator) return {};
  if (getRawType(arr) !== 'Array') throw new Error('it must be Array');

  const iterable = {};
  iterable[Symbol.iterator] = () => {
    arr.length++;
    const iterator = {
      next: () => ({ value: arr.shift(), done: arr.length <= 0 }),
    };
    return iterator;
  };

  return iterable;
};

const itable = __createArrayIterable(['人月', '神话']);
const it = itable[Symbol.iterator]();

// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
