console.log("module a.js start", B);
import B from "./10_module_a.js";

//#region
// 1.0 类
class Wanp {
	// 构造器
	constructor(a) {
		this.example = a;
	}

	// 实例属性 仅实例化对象才能访问 原型Wanp 无法访问
	Wanp_1 = 25;
	Wanp_2 = "car";
	Wanp_3 = "我是Wanp的实例属性！";
	Wanp_4 = [1, 2, 3, 4, 5];
	// 实例方法 仅实例化对象才能访问 或从 Wanp.prototype.say() 访问
	say() {
		return "我是Wanpan的实例方法 say";
	}

	// 静态方法 static 会生成私有属性 实例化对象无法访问
	static s_fun_inside() {
		return "我是Wanp的静态方法 s_fun_inside";
	}
	static s_str_inside = "我是Wanp的静态属性 s_str_inside";
}
Wanp.s_str_out = "我是Wanp的静态属性 s_str_out";
Wanp.s_fun_out = function () {
	return "我是Wanp的静态方法 s_fun_out";
};
console.log("#1-1 Wanp -", Wanp.prototype);

// 原型可以访问 自身的私有属性
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

console.log("======================================");

const wanpan = new Wanp("hahaha");
console.log("#2-0 wanpan -", wanpan);

// // 实例无法访问 原型的私有属性
// console.log("#2-1 wanpan -", wanpan.s_fun_inside);
// console.log("#2-2 wanpan -", wanpan.s_str_inside);
// // 实例可以访问 原型的实例属性
// console.log("#2-3 wanpan -", wanpan.age);
// console.log("#2-4 wanpan -", wanpan.say);

console.log("======================================");

// 每个函数都有prototype属性，除了Function.prototype.bind()，该属性指向原型。
// 每个对象都有__proto__属性，指向了创建该对象的构造函数的原型。其实这个属性指向了[[prototype]]，但是[[prototype]]是内部属性，我们并不能访问到，所以使用_proto_来访问。
// 对象可以通过__proto__来寻找不属于该对象的属性，__proto__将对象连接起来组成了原型链。

//#endregion
