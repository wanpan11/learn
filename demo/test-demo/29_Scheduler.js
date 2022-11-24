class Scheduler {
  constructor() {
    this.callbacks = [];
    /* 微任务批量处理 */
    queueMicrotask(() => {
      this.runTask();
    });
  }

  /* 增加任务 */
  addTask(fn) {
    this.callbacks.push(fn);
  }

  runTask() {
    console.log("------合并更新开始------");
    while (this.callbacks.length > 0) {
      const cur = this.callbacks.shift();
      cur();
    }
    console.log("------合并更新结束------");
    console.log("------开始更新组件------");
  }
}

function nextTick(cb) {
  const scheduler = new Scheduler();
  cb(scheduler.addTask.bind(scheduler));
}

/* 模拟一次更新 */
function mockOnclick() {
  nextTick(add => {
    add(function () {
      console.log("第一次更新");
    });
    console.log("----宏任务逻辑----");
    add(function () {
      console.log("第二次更新");
    });
  });
}

mockOnclick();
