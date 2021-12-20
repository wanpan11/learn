let data = [{ a: 1 }, { b: 1 }, { c: 1 }];
const arr = [888];

data.forEach(el_root => {
  console.log(el_root);
  //   el_root = 9999;
  arr.forEach(el => {
    // el_root = el;
    el_root.b = el;
  });
});

// data[0] = arr[0];

console.log(data);
