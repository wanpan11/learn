Function.prototype.myCall = function(context, ...args) {
  debugger
  // 判断是否是undefined和null
  if (typeof context === 'undefined' || context === null) {
    context = window
  }
  let fnSymbol = Symbol()
  context[fnSymbol] = this
  let fn = context[fnSymbol] (...args)
  delete context[fnSymbol] 
  return fn
}

function wanpan(params) {
  debugger
  console.log(this);
}

wanpan.myCall(null,1)