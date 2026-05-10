/* 函数柯里化 */

// 简单实现，参数只能从右到左传递
function createCurry(func, args) {
  const arity = func.length
  const args_root = args || []

  return function () {
    const _args = [].slice.call(arguments);
    [].push.apply(_args, args_root)

    // 如果参数个数小于最初的func.length，则递归调用，继续收集参数
    if (_args.length < arity) {
      return createCurry.call(this, func, _args)
    }

    // 参数收集完毕，则执行func
    return func.apply(this, _args)
  }
}

function check(targetString, reg) {
  return reg.test(targetString)
}

const _check = createCurry(check)

const checkPhone = _check(/^1[34578]\d{9}$/)

console.log('name ===>', checkPhone('17010200061'))
