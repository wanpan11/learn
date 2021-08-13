import React, { useState, useEffect } from 'react'
import App_2 from './App copy'


function App() {

  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('父组件');
    return () => {
      cleanup
    }
  }, [count])

  import('./utils').then(utils => {
    utils.wanpan('string');
  });

  return (
    <div>
      <App_2 />
    </div>
  )
}

export default App
