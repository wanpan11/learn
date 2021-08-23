import React, { Component } from 'react';
import GridLayoutApp from './pages/app';
import ContextDemo from './pages/app2';
import Dnd from './pages/app3';

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
