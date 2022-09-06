const a: number = 1;

const arr_1: [number, string] = [1, "1"];
const arr_2: Array<number | string> = [1, "1"];

function print<T>(arg: T): T {
  console.log(arg);

  console.log(arguments.callee);

  return arg;
}

// print<string>("hello"); // 定义 T 为 string

// print<number>("hello"); // TS 类型推断，自动推导类型为 string

type Print = <T>(arg: T) => T;
const printFn: Print = function print(arg) {
  console.log(arg);
  return arg;
};

printFn<number>("123");
