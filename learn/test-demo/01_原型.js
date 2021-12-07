/* 1- 原型对象 使用function关键字来创建函数时会产生原型对象 */
function Wanpan(params) {}
// const Caoyemeng = () => {};
// console.log(Caoyemeng.prototype);

// console.log("Wanpan 的原型 ---", Wanpan.prototype); // 原型
// console.log("Wanpan 的构造函数 ---", Wanpan.constructor); // 构造函数
// console.log("构造函数 的原型 ---", Wanpan.constructor.prototype); // 构造函数 的原型
// console.log(
//   "构造函数 的原型 的原型 ---",
//   Wanpan.constructor.prototype.__proto__
// ); // 构造函数 的原型 的原型  万物基于object

// console.log(
//   "Wanpan.constructor 的构造函数等于 Wanpan ---",
//   Wanpan.prototype.constructor === Wanpan
// );

/* 
  原型.constructor  ===> 构造函数
  构造函数.prototype ===> 原型
  原型.__proto__ ===> object.prototype
  实例.__proto__ ===> 原型

  --- 原型链 ---
  实例 ===> 原型 ===> Object.prototype



                  < constructor 
                    prototype >
  构造函数      =====================     原型
                              =           |
                          =               |
                      =                   |
                  =                       |
  实例.__proto__                      .__proto__
                                          |
                                          |
                                          |
  Object()      ==================  Object.prototype
                  < constructor 
                    prototype >                     
*/

/* ================================================================== */

/* 2- 函数实例 使用function关键字来创建函数时会产生原型对象 */
const wanpan = new Wanpan();
// console.log(wanpan.__proto__);
// console.log(wanpan.__proto__ === Wanpan.prototype);

/* ================================================================== */

function Super() {
  this.property = true;
}
Super.prototype.getSuperValue = function () {
  return this.property;
};
function Sub() {
  this.subProperty = false;
}

// Sub原型指向Super实例，constructor被重写，指向Super
Sub.prototype = new Super();
Sub.prototype.getSubValue = function () {
  return this.subProperty;
};

let sub = new Sub();

console.log(sub);
console.log(Sub.prototype);

console.log("获取Super的属性值", sub.getSubValue());
console.log("获取Super的属性值", sub.getSuperValue());
console.log(
  "sub实例的原型对象等于Sub构造函数的原型对象",
  sub.__proto__ === Sub.prototype
);
console.log(
  "Sub构造函数的原型对象的原型对象等于Super构造函数的原型对象",
  Sub.prototype.__proto__ === Super.prototype
);
console.log(
  "Sub构造函数的原型对象constructor指向Super的构造函数",
  Sub.prototype.constructor === Super
);

// //#region
// // 1.0 类
// class Wanp {
//   // 构造器
//   constructor(a) {
//     this.example = a;
//   }

//   // 实例属性 仅实例化对象才能访问 原型Wanp 无法访问
//   Wanp_1 = 25;
//   Wanp_2 = "car";
//   Wanp_3 = "我是Wanp的实例属性！";
//   Wanp_4 = [1, 2, 3, 4, 5];
//   // 实例方法 仅实例化对象才能访问 或从 Wanp.prototype.say() 访问
//   say() {
//     return "我是Wanpan的实例方法 say";
//   }

//   // 静态方法 static 会生成私有属性 实例化对象无法访问
//   static s_fun_inside() {
//     return "我是Wanp的静态方法 s_fun_inside";
//   }
//   static s_str_inside = "我是Wanp的静态属性 s_str_inside";
// }
// Wanp.s_str_out = "我是Wanp的静态属性 s_str_out";
// Wanp.s_fun_out = function () {
//   return "我是Wanp的静态方法 s_fun_out";
// };
// console.log("#1-1 Wanp -", Wanp.prototype);

// // 原型可以访问 自身的私有属性
// console.log("#1-2 Wanp -", Wanp.s_fun_inside);
// console.log("#1-3 Wanp -", Wanp.s_fun_out);
// console.log("#1-4 Wanp -", Wanp.s_str_inside);
// console.log("#1-5 Wanp -", Wanp.s_str_out);
// // 原型无法直接访问自身的实例属性
// console.log("#1-6 Wanp -", Wanp.age);
// console.log("#1-7 Wanp -", Wanp.say);
// // 但是可以 通过ptototype 访问到原型上的实例方法 （属性无法访问）
// console.log("#1-8 Wanp -", Wanp.prototype.say);
// console.log("#1-9 Wanp -", Wanp.prototype.example);

// console.log("======================================");

// const wanpan = new Wanp("hahaha");
// console.log("#2-0 wanpan -", wanpan);

// // 实例无法访问 原型的私有属性
// console.log("#2-1 wanpan -", wanpan.s_fun_inside);
// console.log("#2-2 wanpan -", wanpan.s_str_inside);
// // 实例可以访问 原型的实例属性
// console.log("#2-3 wanpan -", wanpan.age);
// console.log("#2-4 wanpan -", wanpan.say);

// console.log("======================================");

// // 每个函数都有prototype属性，除了Function.prototype.bind()，该属性指向原型。
// // 每个对象都有__proto__属性，指向了创建该对象的构造函数的原型。其实这个属性指向了[[prototype]]，但是[[prototype]]是内部属性，我们并不能访问到，所以使用_proto_来访问。
// // 对象可以通过__proto__来寻找不属于该对象的属性，__proto__将对象连接起来组成了原型链。

// //#endregion
