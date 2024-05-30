/* ===========  promise 报错捕捉 =========== */
const promise_1 = () => {
  return new Promise((res, rej) => {
    // throw "1";
    res("res");
  });
};

/* promise_1()
  .then(
    res_1 => {
      console.log("res_1 ===> ", res_1);
      throw "err_1";
    },
    rej_1 => {
      console.log("rej_1 ===> ", rej_1);
    }
  )
  .then(
    res_2 => {
      console.log("res_2 ===> ", res_2);
    },
    rej_2 => {
      console.log("rej_2 ===> ", rej_2);
    }
  )
  .then(
    res_3 => {
      console.log("res_3 ===> ", res_3);
    },
    rej_3 => {
      console.log("rej_3 ===> ", rej_3);
    }
  )
  .catch(err => {
    console.log("err ===> ", err);
  }); */

/* ===========  promise 无返回值 挂载回收 =========== */
const start = async type => {
  return new Promise(res => {
    setTimeout(() => {
      if (type === 1) return;

      res("done");
    }, 1000);
  });
};

const fun_a = async () => {
  const a = await start(1);
  console.log("fun_a ===>", a);
};
const fun_b = async () => {
  const b = await start();
  console.log("fun_b ===>", b);
};
fun_a(); // 没有执行返回 挂载等待回收
fun_b(); // 执行返回 正常释放

/* ===========  promise.then 立即返回一个新的 Promise 对象，该对象始终处于待定状态，无论当前 Promise 对象的状态如何 =========== */
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
const mockActionFn = () => {
  let ret = Promise.resolve();
  let resolveFn;
  let rejectFn;

  ret = ret.then(
    v => {
      resolveFn?.(v);
    },
    e => {
      rejectFn?.(e)?.catch(err => {
        global.rejectPromise = err;
      });
    }
  );
  ret.then = (resolve, reject) => {
    resolveFn = resolve;
    rejectFn = reject;
  };

  return ret;
};

const mockRes = mockActionFn();

mockRes.then(res => {
  console.log("[ res ] ===>", res);
});
