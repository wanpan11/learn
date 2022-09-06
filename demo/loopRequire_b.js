/* a 已经加载过了 故此时取缓存中的值 */
import { a, a_fun } from "./loopRequire_a.js";

console.log("b file");

/* 函数声明例外 */
console.log("a_fun ===> ", a_fun);

/* 因为 a 模块并没有执行完毕 所以此时的 a 还没定义 */
console.log("a ===> ", a);

const b = 2;

export { b };
