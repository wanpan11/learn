const a = 90;
const b = 100;
function wanpan(params, a, b) {
  console.log("params ===> ", params);
  console.log("a ===> ", a);
  console.log("b ===> ", b);
}

wanpan`That ${a} is a ${b}.`;
