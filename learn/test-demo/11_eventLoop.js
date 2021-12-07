console.log("script start");

async function async_1(params) {
  await async_2;
  console.log("async_1 end");
}
async function async_2(params) {
  console.log("async_2 end");
}

async_1();

setTimeout(() => {
  console.log("setTimeout_1 宏任务");
  new Promise((res, rej) => {
    console.log("Promise_2");
    res(1);
  }).then(feed => {
    console.log("Promise_2_then_1");
  });
});

setTimeout(() => {
  console.log("setTimeout_2");
});

new Promise((res, rej) => {
  console.log("Promise");
  res(1);
})
  .then(feed => {
    console.log("Promise_then_1");
  })
  .then(feed => {
    console.log("Promise_then_2");
    setTimeout(() => {
      console.log(11);
    });
  });

console.log("script end");

/* 
  script 第一次执行 属于宏任务
  在本次宏任务中产生的
  -- 微任务 会进入微任务队列
  -- 宏任务 会进入宏任务队列

*/
