import React from 'react';
import GridLayoutApp from './pages/grid-layout';
import ContextDemo from './pages/context-demo';
import Dnd from './pages/dnd';

export default function Container() {
  return (
    <div>
      <h1>GridLayoutApp</h1>
      <GridLayoutApp />
      <hr />

      <h1>Context</h1>
      <ContextDemo />
      <hr />

      <h1>Dnd</h1>
      <Dnd />
      <hr />
    </div>
  );
}
