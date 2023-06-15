const promise_1 = () => {
  return new Promise((res, rej) => {
    // throw "1";
    res("res");
  });
};

promise_1()
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
    }
    // rej_2 => {
    //   console.log("rej_2 ===> ", rej_2);
    // }
  )
  .then(
    res_3 => {
      console.log("res_3 ===> ", res_3);
    }
    // rej_3 => {
    //   console.log("rej_3 ===> ", rej_3);
    // }
  )
  .catch(err => {
    console.log("err ===> ", err);
  });
