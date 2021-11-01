import React from 'react';
import styleComponent from 'styled-components';
import GridLayoutApp from './pages/grid-layout';
import ContextDemo from './pages/context-demo';
import Dnd from './pages/dnd';
import ClassOrFunction from './pages/class-function';

const Box = styleComponent.div`
  padding:0 24px;
`;

export default function Container() {
  return (
    <Box>
      <h1>ClassOrFunction</h1>
      <ClassOrFunction />
      <hr />

      {/* <h1>GridLayoutApp</h1>
      <GridLayoutApp />
      <hr />

      <h1>Context</h1>
      <ContextDemo />
      <hr />

      <h1>Dnd</h1>
      <Dnd />
      <hr /> */}
    </Box>
  );
}
