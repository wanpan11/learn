const a = null;
const b = { ...a };

const c = { a: 1, b: 2 };
const d = { ...c, b: 10 };

function name(...a) {
  console.log(a);
}

name(1, 2, 3);

console.log(b);
console.log(d);
