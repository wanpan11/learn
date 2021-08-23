import React, { useState, useEffect, useCallback } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './index.scss';
import GridLayout from 'react-grid-layout';

function GridLayoutApp() {
  //

  const onDrop = useCallback((layout) => {
    console.log('#GridLayoutApp onDrop', layout);
  }, []);

  const onDragStart = useCallback((e) => {
    const type = e.dataTransfer.setData('text/plain', '');
    console.log('#GridLayoutApp onDragStart', type);
    return type;
  }, []);

  const layoutArr = [
    { i: '不可拖拽元素', x: 0, y: 0, w: 1, h: 2, static: true },
    { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 },
  ];

  return (
    <div>
      {/* 新增元素 */}
      <button
        className='droppable-element'
        draggable={true}
        unselectable='on'
        onDragStart={onDragStart}
      >
        拖拽添加
      </button>
      {/* 拖拽区域 */}
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

export default GridLayoutApp;
