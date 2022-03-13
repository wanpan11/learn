/* eslint-disable no-debugger */
import { useState } from 'react';

function Fun_1() {
  const [data, setData] = useState({ a: 1 });

  function sync() {
    setData({ a: 2 });
    setData({ a: 3 });
    setData({ a: 0 });
  }
  function async() {
    Promise.resolve().then(() => {
      setData({ a: 2 });
      debugger;
      setData({ a: 3 });
      debugger;
      setData({ a: 0 });
      debugger;
    });
  }

  console.log('Fun_1 reload');

  return (
    <div>
      <button onClick={sync}>同步 {data.a}</button>
      <button onClick={async}>异步 {data.a}</button>
    </div>
  );
}

export default Fun_1;
