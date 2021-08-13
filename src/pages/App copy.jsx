import React, { useState, useEffect } from 'react'

function App() {

  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('子组件');
    return () => {
      cleanup
    }
  }, [count])

  import('./utils').then(utils => {
    utils.wanpan('string');
  });

  return (
    <div>
      333
    </div>
  )
}

export default App
