import React, { useState, useEffect, useContext } from 'react';

const data_root = {
  name: 'wanpan',
  age: 25,
  number: 1,
};
// context 全局数据
const GlobalData = React.createContext(data_root);

/* 里层 */
const DemoState_1 = (props) => {
  //
  const context = useContext(GlobalData);

  const { data } = props;

  const [wanpan, setwanpan] = useState(() => {
    return 1;
  });

  useEffect(() => {
    console.log('#ContextDemo useEffect 里层', context);
  }, [context]);

  return (
    <div style={{ border: '1px solid black', padding: '12px' }}>
      <div>里层组件</div>

      <div>props：{data}</div>

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
        context：{context.data.number}
        <button
          onClick={() => {
            context.setData({
              ...context.data,
              number: context.data.number + 2,
            });
          }}
        >
          context+2
        </button>
      </div>
    </div>
  );
};

/* 中间层 */
const DemoState = () => {
  //
  const context = useContext(GlobalData);

  const [number, setNumber] = useState(() => {
    return 1;
  });

  useEffect(() => {
    console.log('#ContextDemo useEffect 中间层', context);
  }, [context]);

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
        <span>context：{context.data.number}</span>
        <button
          onClick={() => {
            const newObj = {
              ...context.data,
              number: ++context.data.number,
            };
            context.setData(newObj);
          }}
        >
          context+1
        </button>
      </div>

      <h1></h1>

      <DemoState_1 data={number} />
    </div>
  );
};

/* 外层 */
function Demo() {
  const [data, setData] = useState(data_root);
  return (
    <GlobalData.Provider value={{ data, setData }}>
      <div style={{ border: '1px solid red', padding: '12px' }}>
        <h4>外层组件</h4>
        <DemoState></DemoState>
      </div>
    </GlobalData.Provider>
  );
}

export default Demo;
