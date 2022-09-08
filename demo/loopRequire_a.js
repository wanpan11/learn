/* 首次进入 a 模块 会先加入缓存 */
/* 从上往下 依次导入依赖执行 c - b - a */
import { c } from "./loopRequire_c.js";
import { b } from "./loopRequire_b.js";

console.log("a file");
console.log("a b ===> ", b);
console.log("a c ===> ", c);

/* 没有提升 会报错 */
const aConst = "aConst";

/* 有提升 但是不会提前赋值 所以是 undefined */
var aVar = "aVar";

/* 函数声明 具有编译时提升 所以在运行时可以访问到 */
function aFun(params) {}

export { aConst, aVar, aFun };
