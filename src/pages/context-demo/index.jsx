import React, { useState, useEffect, useContext } from 'react';

const data_root = {
  name: 'wanpan',
  age: 25,
  number: 1,
  arr: [{ arr_2: [1, 2, 3] }],
};
// context 全局数据
const GlobalData = React.createContext(data_root);

/* 里层 */
const DemoState_1 = (props) => {
  //
  const { data, setData, arrData, setArrData } = useContext(GlobalData);

  const { props_data } = props;

  const [wanpan, setwanpan] = useState(() => {
    return 1;
  });

  useEffect(() => {
    console.log('#ContextDemo useEffect 里层', arrData, data);
  }, [arrData, data]);

  return (
    <div style={{ border: '1px solid black', padding: '12px' }}>
      <div>里层组件</div>

      <div>props：{props_data}</div>

      <div>
        state：{wanpan}
        <button
          onClick={() => {
            setwanpan(wanpan + 1);
          }}
        >
          里层组件 state+
        </button>
      </div>

      <div>
        context：{data.number}
        <button
          onClick={() => {
            setData({
              ...data,
              number: data.number + 2,
            });
          }}
        >
          context+2
        </button>
      </div>

      <div>
        context：arrData
        <button
          onClick={() => {
            setArrData((arr) => [...arr, 99]);
          }}
        >
          context：arrData change
        </button>
      </div>

      <div>
        context：arrData
        <button
          onClick={() => {
            setData((data_root) => {
              const { arr } = data_root;
              arr.forEach((element) => {
                element.arr_2.push(99);
              });
              return data_root;
            });
          }}
        >
          context：aarr_2 change
        </button>
      </div>
    </div>
  );
};

/* 中间层 */
const DemoState = () => {
  //
  const { data, setData, arrData, setArrData } = useContext(GlobalData);

  const [number, setNumber] = useState(() => {
    return 1;
  });

  useEffect(() => {
    console.log('#ContextDemo useEffect 里层', arrData, data);
  }, [arrData, data]);

  return (
    <div style={{ border: '1px solid blue', padding: '12px' }}>
      <div>中间组件</div>

      <div>
        <span>state：{number}</span>
        <button
          onClick={() => {
            setNumber(number + 1);
          }}
        >
          中间组件 state+
        </button>
      </div>

      <div>
        <span>context：{data.number}</span>
        <button
          onClick={() => {
            const newObj = {
              ...data,
              number: ++data.number,
            };
            setData(newObj);
          }}
        >
          context+1
        </button>
      </div>

      <h1></h1>

      <DemoState_1 props_data={number} />
    </div>
  );
};

/* 外层 */
function Demo() {
  const [data, setData] = useState(data_root);
  const [arrData, setArrData] = useState([1, 2, 3]);
  return (
    <GlobalData.Provider value={{ data, setData, arrData, setArrData }}>
      <div style={{ border: '1px solid red', padding: '12px' }}>
        <h4>外层组件</h4>
        <DemoState></DemoState>
      </div>
    </GlobalData.Provider>
  );
}

export default Demo;
