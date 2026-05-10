console.log('script start')

setTimeout(() => {
  console.log('setTimeout_1 宏任务 4000ms')
}, 4000)

setTimeout(() => {
  console.log('setTimeout_2.1 宏任务 2000ms')
  new Promise((res) => {
    console.log('setTimeout_2.1 Promise')
    res(1)
  }).then(() => {
    console.log('setTimeout_2.1 Promise_then')
  })
}, 2000)

setTimeout(() => {
  console.log('setTimeout_2 宏任务 2000ms')
}, 2000)

new Promise((res) => {
  console.log('Promise')
  res(1)
})
  .then(() => {
    console.log('Promise_then_1')
  })
  .then(() => {
    console.log('Promise_then_2')
    setTimeout(() => {
      console.log('setTimeout_3 0ms')
    })
  })

async function async_1() {
  await async_2()
  console.log('async_1 end')
}
async function async_2() {
  console.log('async_2 end')
}

async_1()

console.log('script end ======================  同步任务结束 ======================')

/*
  script 第一次执行 属于宏任务
  在本次宏任务中产生的
  -- 微任务 会进入微任务队列
  -- 宏任务 会进入宏任务队列

  宏任务会先注册在 event table 里 当满足触发条件时会进入任务队列

*/
