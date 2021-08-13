import React, { useState, useEffect } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './index.scss';
import GridLayout from 'react-grid-layout';
// import App_2 from '../App copy';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('父组件');
    return () => {
      cleanup;
    };
  }, [count]);

  /* 懒加载 */
  // import('./utils').then(utils => {
  //   utils.wanpan('string');
  // });

  function onDrop(layout) {
    console.log('#onDrop', layout);
  }

  function onDragStart(e) {
    const type = e.dataTransfer.setData('text/plain', '');
    console.log('#onDragStart', type);
    return type;
  }

  const layoutArr = [
    { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
    { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 },
  ];

  return (
    <div>
      <div
        className='droppable-element'
        draggable={true}
        unselectable='on'
        onDragStart={onDragStart}
      >
        拖拽添加
      </div>
      <GridLayout
        className='layout'
        cols={4}
        width={1200}
        rowHeight={80}
        layout={layoutArr}
        onDrop={onDrop}
        isDroppable={true}
      >
        {layoutArr.map((item) => (
          <div key={item.i} className='item'>
            {item.i}
          </div>
        ))}
      </GridLayout>
      {/* <App_2 /> */}
    </div>
  );
}

export default App;
