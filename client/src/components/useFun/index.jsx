import { useState } from 'react';

function Fun() {
  const [data_1, setData_1] = useState(0);
  const [data_2, setData_2] = useState({ name: '' });

  const fun1 = async () => {
    console.log(data_1);
    console.log(data_2);
    const res = await fun2();
    console.log('res', res);
    console.log(data_1);
    console.log(data_2);
  };

  // const fun2 = async () => {
  //   return new Promise(res => {
  //     setData_1(2);
  //     setData_2(draft => {
  //       let obj = {};
  //       // draft.name = 'wanpan';
  //       obj.name = draft.name;
  //       return obj;
  //     });
  //     res(1);
  //   });
  // };

  const fun2 = async () => {
    return new Promise(res => {
      setData_1(2);
      setData_2(draft => {
        draft.name = 'wanpan';
        return { ...draft };
      });
      res(1);
    });
  };

  // const fun3 = () => {
  //   setData_1(2);
  //   setData_2({ name: 'wanpan' });
  // };

  console.log('render');

  return <div onClick={fun1}>点我</div>;
}

export default Fun;
