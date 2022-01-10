import { useState } from 'react';
import styleComponent from 'styled-components';
// import Dnd from '../components/dnd';
// import ContextDemo from '../components/context-demo';
// import GridLayoutApp from '../components/grid-layout';
// import ClassOrFun from '../components/class-function';
import Usefun from '../components/useFun';

const Box = styleComponent.div`
  padding:0 24px;

  .tips{
	  font-size:16px;
  }
`;

export default function Container() {
  const [more, moreHandle] = useState(false);

  return (
    <Box>
      <h1> ClassOrFunction </h1>
      {/* <ClassOrFun /> */}
      <hr />

      <button onClick={() => moreHandle(!more)}>查看更多</button>

      {more ? (
        <>
          <h1> GridLayoutApp </h1>
          {/* <GridLayoutApp /> */}
          <hr />

          <h1>
            ContextDemo
            <span className="tips">(用于处理多层嵌套 数据共享)</span>
          </h1>
          {/* <ContextDemo /> */}
          <hr />

          <h1> Dnd </h1>
          {/* <Dnd /> */}
          <hr />

          <h1> Usefun </h1>
          <Usefun />
          <hr />
        </>
      ) : null}
    </Box>
  );
}
