import { useState } from 'react';
import Store from './store';
import ChildOne from './ChildOne';
import ChildTwo from './ChildTwo';

function Context() {
  const [contextData, contextDataHandle] = useState(1);
  return (
    <Store.Provider value={{ contextData, contextDataHandle }}>
      <div>
        第一个儿子
        <ChildOne />
      </div>

      <hr />

      <div>
        第二个儿子
        <ChildTwo />
      </div>
    </Store.Provider>
  );
}

export default Context;
