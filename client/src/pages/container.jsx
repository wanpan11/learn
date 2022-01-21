import { useState } from 'react';
import { Box } from './style';
// import Dnd from '../components/dnd';
// import ContextDemo from '../components/context-demo';
// import GridLayoutApp from '../components/grid-layout';
import ClassOrFun from '../components/class-function';
import { useSelector, useDispatch } from 'react-redux';
import { add } from '../redux/actions';

function Container() {
  const [more, moreHandle] = useState(false);

  const data = useSelector(state => state.data);
  const dispatch = useDispatch();

  const onMore = () => {
    moreHandle(!more);
  };

  const onClick = () => {
    dispatch(add());
  };

  return (
    <Box>
      <h1 onClick={onClick}> redux {data} </h1>
      <hr />

      <h1> ClassOrFunction </h1>
      <ClassOrFun />
      <hr />

      <button onClick={onMore}>查看更多</button>

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
        </>
      ) : null}
    </Box>
  );
}

export default Container;
