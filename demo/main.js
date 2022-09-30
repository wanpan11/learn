// import "./test-demo/01_原型.js";
// import './test-demo/02_定时器.js';
// import "./test-demo/03_async、await.js";
// import './test-demo/04_json.js';
// import "./test-demo/05_new.js";
// import "./test-demo/09_链表.js";
// import './test-demo/11_eventLoop.js';
// import './test-demo/12_jsonp.js';
// import "./test-demo/13_forEach.js";
// import "./test-demo/14_requestAnimationFrame.js";
// import "./test-demo/15_算法.js";
// import "./test-demo/16_call、apply.js";
// import "./test-demo/17_表达式.js";
// import "./test-demo/18_尾调用.js";
// import * as wanpan from "./test-demo/19_esm_index.js";
// import "./test-demo/20_引用对象.js";
// import "./test-demo/21_扩展运算符.js";
// import "./test-demo/22_proxy.js";
// import "./test-demo/23_隐式转换.js";
// import "./test-demo/24_webComponents.js";
// import "./test-demo/25_标签模板字符串.js";
// import "./test-demo/26_class.js";
import "./test-demo/27_this.js";

/* =========================== 测试代码 =========================== */
// console.log(wanpan);

/**
 * 循环引用问题
 * main 引用 loopRequire_a
 * loopRequire_a 引用 loopRequire_b
 * loopRequire_b 引用 loopRequire_a
 * esModule 执行顺序 子>父 遇到 import 就去执行该模块 再返回执行父模块
 * esModule 导入的是实际引用值 基础数据类型 不可修改 引用数据类型 不能直接复制修改
 */

/* 遇到 import a 模块 跳至a */
// import "./loopRequire_a.js";
console.log("main file");
