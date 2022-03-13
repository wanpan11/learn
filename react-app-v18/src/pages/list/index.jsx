/* eslint-disable no-debugger */
import { useState } from "react";

function Fun_1() {
  const [data_1, setData_1] = useState({ a: 1 });
  const [data_2, setData_2] = useState({ a: 1 });

  function sync() {
    setData_1({ a: 2 });
    console.log(data_1.a);
    setData_1({ a: 3 });
    console.log(data_1.a);
    setData_1({ a: 0 });
    console.log(data_1.a);
  }
  function async() {
    Promise.resolve().then(() => {
      setData_2({ a: 2 });
      console.log(data_2.a);
      // debugger;
      setData_2({ a: 3 });
      console.log(data_2.a);
      // debugger;
      setData_2({ a: 0 });
      console.log(data_2.a);
      // debugger;
    });
  }

  console.log("Fun_1 reload");

  return (
    <div>
      <button onClick={sync}>同步 {data_1.a}</button>
      <button onClick={async}>异步 {data_2.a}</button>
    </div>
  );
}

export default Fun_1;
