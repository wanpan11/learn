/* a 已经加载过了 故此时取缓存中的值 */
import { aFun, aVar } from './loopRequire_a.js'

console.log('执行 ===> b')

/* 函数声明 具有编译时提升 所以在运行时可以访问到 */
console.log('b ===> aFun', aFun)

/* 有提升 但是不会提前赋值 所以是 undefined */
console.log('b ===> aVar', aVar)

/* 没有提升 会报错 'aConst' before initialization */
// console.log("b ===> aConst", aConst);

const b = 2

export { b }
