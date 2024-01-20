const promise_1 = () => {
  return new Promise((res, rej) => {
    // throw "1";
    res("res");
  });
};

// promise_1()
//   .then(
//     res_1 => {
//       console.log("res_1 ===> ", res_1);
//       throw "err_1";
//     },
//     rej_1 => {
//       console.log("rej_1 ===> ", rej_1);
//     }
//   )
//   .then(
//     res_2 => {
//       console.log("res_2 ===> ", res_2);
//     }
//     // rej_2 => {
//     //   console.log("rej_2 ===> ", rej_2);
//     // }
//   )
//   .then(
//     res_3 => {
//       console.log("res_3 ===> ", res_3);
//     }
//     // rej_3 => {
//     //   console.log("rej_3 ===> ", rej_3);
//     // }
//   )
//   .catch(err => {
//     console.log("err ===> ", err);
//   });

/* ===========  promise 无返回值 挂载回收 =========== */
const start = async type => {
  return new Promise(res => {
    for (let index = 0; index < 10; index++) {
      if (type === 1) return;
    }

    res("done");
  });
};

const fun_a = async () => {
  const a = await start(1);
  console.log("fun_a ===>", a);
};

const fun_b = async () => {
  const a = await start();
  console.log("fun_b ===>", a);
};

fun_a();
fun_b();
