/*  new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。 */
//#region
// 函数表达式
// const wanpan = function () {
//   console.log("函数表达式");
// };
// // 函数声明 具有变量提示
// function wanpan() {
//   console.log("函数声明");
// }
// // 方法定义 方法没有构造函数
// const obj = {
//   wanpan() {
//     console.log("方法定义");
//   },
// };

// // ----- ES5 新写法
// const obj_1 = {
//   method() {
//     // 但是这种新写法没有构造函数
//     return "Hello!";
//   },
// };
// // 等同于
// const obj_1 = {
//   method: function (name) {
//     this.name = name;
//     return "Hello!";
//   },
// };

// //例4 只有当类型为Normal的函数被创建时，它才是可构造的函数，否则他就是不可构造的。
// const example = {
//   Fn: function () {
//     console.log(this);
//   }, // 函数 Normal
//   Arrow: () => {
//     console.log(this);
//   }, // 箭头函数 Arrow
//   Shorthand() {
//     console.log(this);
//   }, // 方法 Method
// };
// new example.Fn(); // Fn {}
// new example.Arrow(); // Uncaught TypeError: example.Arrow is not a constructor
// new example.Shorthand(); // Uncaught TypeError: example.Shorthand is not a constructor
//#endregion

//  手写new
/* 接受一个构建函数 若干个参数 返回实例（或） */
const my_new = function (constructor, ...args) {
  // 1、定义一个新对象
  const obj = {};
  // 2、获取构造函数的返回值
  const res = constructor.call(obj, ...args);

  // 3、将新对象的__proto__指向构造函数的prototype
  obj.__proto__ = constructor.prototype;

  // 4、判断构造函数的返回值 是否为对象 如果是则返此对象，反之返回新对象（实例）
  return res instanceof Object ? res : obj;
};

function Wanpan(name) {
  this.a = 1;
  this.b = 2;
}
Wanpan.prototype.a = 3;
Wanpan.prototype.b = 4;

// const wanpan_1 = my_new(Wanpan, "宛攀");
const wanpan_2 = new Wanpan("晚盘");

// console.log(wanpan_1);
console.log(wanpan_2);
