// ES5 继承实现 - 组合继承（使用 Object.create 优化）
function Parent(name) {
  this.name = name;
}

Parent.prototype.sayHello = function () {
  console.log("Hello, " + this.name);
};

function Child(name, age) {
  // 继承父类属性
  Parent.call(this, name);
  this.age = age;
}

/**
 * 创建新对象：Object.create(proto) 生成一个空对象 obj = {}，但不调用任何构造函数。
 * 设置原型：obj.__proto__ = proto，将新对象的原型指向指定的原型对象 proto。
 * 结果：obj 的原型链变为 obj → Parent.prototype → Object.prototype → null。*
 */
Child.prototype = Object.create(Parent.prototype);
// 设置 constructor 指向 Child 依次调用构造函数
Child.prototype.constructor = Child;

// 子类特有方法
Child.prototype.sayAge = function () {
  console.log("Age: " + this.age);
};

// 测试继承
var child = new Child("Alice", 25);
child.sayHello(); // 输出: Hello, Alice
child.sayAge(); // 输出: Age: 25
console.log(child instanceof Parent); // true
console.log(child instanceof Child); // true

child.__proto__.__proto__ === Parent.prototype; // true
child.__proto__.__proto__.__proto__ === Object.prototype; // true
child.__proto__.__proto__.__proto__.__proto__ === null; // true
