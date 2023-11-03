Function.prototype.myCall = function (context, ...args) {
  // 判断是否是undefined和null
  if (typeof context === "undefined" || context === null) {
    context = window;
  }
  let fnSymbol = Symbol();
  context[fnSymbol] = this;
  let fn = context[fnSymbol](...args);
  delete context[fnSymbol];
  return fn;
};

// function wanpan() {
//   console.log(this);
// }

// wanpan.myCall(null, 1);

Function.prototype.myBind = function myBind(context, ...arg) {
  debugger;
  const fun = this;

  if (fun.prototype === undefined) {
    const activeFun = function (params) {
      fun(...arg);
    };

    activeFun.prototype = this.prototype;
    return activeFun;
  } else {
    context.fun = fun;

    const activeFun = function (params) {
      context.fun(...arg);
      delete context.fun;
    };

    activeFun.prototype = this.prototype;
    return activeFun;
  }
};

Function.prototype.bind2 = function (context) {
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }
  debugger;

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
  };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};

function wanpan(params) {
  const arrow = number => {
    console.log("arrow ===> ", this, number);
  };

  function fun(number) {
    console.log("fun ===> ", this, number);
  }

  arrow.myBind({ name: "la" }, 123)();
  fun.myBind({ name: "la" }, 234)();
}

const obj = { fun: wanpan, name: "obj" };
obj.fun();
