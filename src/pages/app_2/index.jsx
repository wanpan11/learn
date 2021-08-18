import React, { useState, useEffect, useContext } from 'react';

const data_root = {
  name: 'wanpan',
  age: 25,
  number: 1,
};
// context 全局数据
const GlobalData = React.createContext(data_root);

const DemoState_1 = (props) => {
  //
  const context = useContext(GlobalData);

  const { propsData } = props;

  const [wanpan, setwanpan] = useState(() => {
    console.log('init-1 state');
    return 1;
  });

  useEffect(() => {
    console.log('useEffect-1', context);
  }, [context, propsData]);

  return (
    <div>
      <div>最里层组件</div>

      <div>props：{propsData}</div>

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

const DemoState = () => {
  //
  const context = useContext(GlobalData);

  const [number, setNumber] = useState(() => {
    console.log('init-0 state');
    return 1;
  });

  useEffect(() => {
    console.log('useEffect-0', context);
  }, [number, context]);

  return (
    <div>
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

function Demo() {
  const [data, setData] = useState(data_root);
  return (
    <GlobalData.Provider value={{ data, setData }}>
      <DemoState></DemoState>
    </GlobalData.Provider>
  );
}

export default Demo;
