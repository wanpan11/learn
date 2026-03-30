// ==================== call 实现 ====================

/**
 * call 方法实现
 * 1. 将函数设置为对象的属性
 * 2. 执行该函数
 * 3. 删除该属性
 * @param {object} context - 要绑定的 this 上下文
 * @param {...*} args - 传递给函数的参数
 * @returns {*} 函数执行结果
 */
Function.prototype.myCall = function (context, ...args) {
  // 如果 context 为 null 或 undefined，则指向全局对象
  context = context || globalThis

  // 创建一个唯一的属性名，避免覆盖对象原有属性
  const fnSymbol = Symbol('fn')

  // 将当前函数作为 context 的方法
  context[fnSymbol] = this

  // 调用函数并获取结果
  const result = context[fnSymbol](...args)

  // 删除临时添加的属性
  delete context[fnSymbol]

  return result
}

// ==================== apply 实现 ====================

/**
 * apply 方法实现
 * 与 call 类似，但参数以数组形式传递
 * @param {object} context - 要绑定的 this 上下文
 * @param {Array} argsArray - 传递给函数的参数数组
 * @returns {*} 函数执行结果
 */
Function.prototype.myApply = function (context, argsArray) {
  // 如果 context 为 null 或 undefined，则指向全局对象
  context = context || globalThis
  // 创建一个唯一的属性名
  const fnSymbol = Symbol('fn')
  // 将当前函数作为 context 的方法
  context[fnSymbol] = this
  let result
  // 处理参数
  if (!argsArray) {
    // 没有参数时直接调用
    result = context[fnSymbol]()
  }
  else {
    // 有参数时使用展开运算符
    result = context[fnSymbol](...argsArray)
  }
  // 删除临时添加的属性
  delete context[fnSymbol]
  return result
}

// ==================== bind 实现 ====================

/**
 * bind 方法实现
 * 创建一个新函数，在调用时设置 this 为提供的值，并在调用新函数时，
 * 给定的参数序列作为原函数的参数
 * @param {object} context - 要绑定的 this 上下文
 * @param {...*} args - 预设的参数
 * @returns {Function} 绑定后的新函数
 */
Function.prototype.myBind = function (context, ...bindArgs) {
  const self = this

  // 返回一个绑定函数
  function boundFunction(...callArgs) {
    // 如果是通过 new 调用的，this 应该是新创建的实例
    // 此时应该忽略绑定的 context，使用 new 创建的实例作为 this
    const isNew = this instanceof boundFunction
    const thisArg = isNew ? this : context

    // 合并预设参数和调用时传入的参数
    const finalArgs = [...bindArgs, ...callArgs]

    // 调用原函数
    return self.apply(thisArg, finalArgs)
  }

  // 维护原型关系，使得 boundFunction.prototype 可以访问原函数原型上的属性
  if (this.prototype) {
    boundFunction.prototype = Object.create(this.prototype)
  }

  return boundFunction
}

// ==================== 测试代码 ====================

// 测试对象
const person = {
  name: 'Alice',
  age: 25,
}

// 测试函数
function greet(greeting, punctuation) {
  console.log(
    `${greeting}, ${this.name}! You are ${this.age} years old${punctuation}`,
  )
  return this.name
}

function sum(a, b, c) {
  console.log(`Sum: ${a + b + c}`)
  return a + b + c
}

console.log('========== call 测试 ==========')
greet.myCall(person, 'Hello', '!') // Hello, Alice! You are 25 years old!
greet.myCall(null, 'Hi', '?') // Hi, ! You are undefined years old?

console.log('\n========== apply 测试 ==========')
greet.myApply(person, ['Hi', '.']) // Hi, Alice! You are 25 years old.
sum.myApply(null, [1, 2, 3]) // Sum: 6

console.log('\n========== bind 测试 ==========')
const boundGreet = greet.myBind(person, 'Hey')
boundGreet('!!!') // Hey, Alice! You are 25 years old!!!

// bind 柯里化测试
const partialSum = sum.myBind(null, 1)
const finalSum = partialSum(2, 3) // Sum: 6
console.log('Final sum result:', finalSum)

// bind 配合 new 测试
function Person(name, age) {
  this.name = name
  this.age = age
}

const BoundPerson = Person.myBind({ name: 'ShouldNotUse', age: 0 }, 'wanpan')
const bob = new BoundPerson(30)
console.log('\nnew 调用测试:', bob) // { name: 'wanpan', age: 30 }
