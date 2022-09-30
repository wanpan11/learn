const obj = { name: "wanpan" };

/* 剪头函数的 this 声明时就确定了 绝不会变 */
const arrow = (a, b, c, d) => {
  console.log("this ===> ", this, a, b, c, d);
};

const fun = function (...arg) {
  console.log("this ===> ", this, arg);
};

const arrowBind = arrow.bind(obj, 1, 2, 3);
const funBind = fun.bind(obj, 1, 2, 3);

arrowBind(4);
funBind(4);

console.dir("arrow.prototype ===> ", arrow);

/* =========================================== */

class Parent {
  constructor(name) {
    this.name = name;
  }

  arrow = () => {
    console.log("this ===> ", this);
  };
}

const child_1 = new Parent("child_1");
const child_2 = new Parent("child_2");

child_1.arrow();
child_2.arrow();
