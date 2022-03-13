import { useEffect, useState, useLayoutEffect } from 'react';

let num = 0;

function Fun_2() {
  const [data, setData] = useState(0); // initData 不需要手动调用 不然每次update都会调用该函数

  // useEffect useLayoutEffect 区别前者的回调在commit结束后调用，后者的回调在commit阶段中同步执行，最终两者的回到都会执行
  useEffect(() => {
    console.log('useEffect >>');
  });
  useLayoutEffect(() => {
    console.log('useLayoutEffect >>');

    if (num < 10) {
      num++;
      setData(Math.random());
    }
  });

  console.log('fun reload');

  return <div>{data}</div>;
}

export default Fun_2;
