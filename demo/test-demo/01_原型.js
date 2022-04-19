/* 原型 函数式 */
function Fun() {}
console.log("Fun原型 ---", Fun.prototype); // Fun原型
console.log("Fun的原型对象 ---", Fun.__proto__); // Fun的原型对象

/* 实例 */
const fun = new Fun();
console.log("fun的原型对象 ---", fun.__proto__); // fun的原型对象

/* ======================================================================= */

// class 关键字
class Cla {
  constructor(a) {
    this.example = a;
  }

  /* 私有属性 */
  static wawa = "wawa";

  /* 实例属性 */
  sya_1() {}

  /* 原型方法 */
  name = () => {};
}
/* 私有属性 */
Cla.lala = "lala";
console.log("Cla原型 -", Cla.prototype);

class Cla_1 extends Cla {
  constructor(a) {
    super();
    this.example = a;
  }

  say_2() {}
}
console.log("Cla_1 -", Cla_1.prototype);

/* 实例 */
const cla = new Cla("hahaha");
console.log("cla实例 -", cla);

/* ======================================================================= */

// 原型 可以访问 自身的私有属性
// 原型 无法直接访问 实例属性 和 原型方法
// 可以 通过ptototype 原型方法

// 实例无法访问 原型的私有属性
// 实例可以访问 原型的实例属性
// 实例可以访问 原型的原型方法

// 每个函数都有prototype属性，除了Function.prototype.bind()，该属性指向原型。
// 每个对象都有__proto__属性，指向了创建该对象的构造函数的原型。其实这个属性指向了[[prototype]]，但是[[prototype]]是内部属性，我们并不能访问到，所以使用_proto_来访问。
// 对象可以通过__proto__来寻找不属于该对象的属性，__proto__将对象连接起来组成了原型链。
