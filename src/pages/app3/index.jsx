import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Item from './item';

const Task = ({ id, content, index }) => {
  return (
    <div style={{ margin: 3 }}>
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <div
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            {
              <div
                style={{
                  border: '2px solid #000',
                  background: snapshot.isDragging ? '#ccc' : 'lightgreen',
                }}
              >
                {content}
              </div>
            }
          </div>
        )}
      </Draggable>
    </div>
  );
};

const Column = ({ id, title, tasks }) => (
  <>
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {tasks.map((task, index) => (
            <Task key={task.id} {...task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </>
);

const Dnd = () => {
  //

  const dragEnd = (e) => {
    // 拖拽结束后
    // do something 。。。。
  };

  const columnArr = [
    {
      id: '111',
      title: 'wanpan-0',
      tasks: [{ id: '111-1', content: <Item /> }],
    },
    { id: '222', title: 'wanpan-1', tasks: [{ id: '222-1' }] },
  ];

  return (
    <DragDropContext
      onDragEnd={(e) => dragEnd(e)}
      // onDragUpdate = {(e)=>dragUpdate(e)}
      // onDragStart = {(e)=>dragStart(e)}
    >
      {columnArr.map((ele) => (
        <Column {...ele} key={ele.id}></Column>
      ))}
    </DragDropContext>
  );
};

export default Dnd;
