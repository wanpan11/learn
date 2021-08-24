import React from 'react';

export default function Item(props) {
  return (
    <div style={{ margin: '20px', background: '#fff', padding: '20px' }}>
      <div>{props.data}</div>
    </div>
  );
}
