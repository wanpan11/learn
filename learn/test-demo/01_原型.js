/* 原型 函数式 */
function Fun() {}
console.log("Fun 的原型 ---", Fun.prototype); // 原型

/* 实例 */
const fun = new Fun();
console.log("fun 的原型 ---", fun); // 原型

/* ======================================================================= */

// class 关键字
class Cla {
  constructor(a) {
    this.example = a;
  }

  sya_1() {}
  name = () => {};
}
console.log("#1-1 Cla -", Cla.prototype);

class Cla_1 extends Cla {
  constructor(a) {
    this.example = a;
  }

  say_2() {}
}
console.log("#1-2 Cla_1 -", Cla_1.prototype);

/* 实例 */
const cla = new Cla("hahaha");
console.log("#2-0 cla -", cla);

/* ======================================================================= */

// 原型可以访问 自身的私有属性
// 原型无法直接访问自身的实例属性
// 但是可以 通过ptototype 访问到原型上的实例方法 （属性无法访问）

// 实例无法访问 原型的私有属性
// 实例可以访问 原型的实例属性

// 每个函数都有prototype属性，除了Function.prototype.bind()，该属性指向原型。
// 每个对象都有__proto__属性，指向了创建该对象的构造函数的原型。其实这个属性指向了[[prototype]]，但是[[prototype]]是内部属性，我们并不能访问到，所以使用_proto_来访问。
// 对象可以通过__proto__来寻找不属于该对象的属性，__proto__将对象连接起来组成了原型链。
