import { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
// import Container from './pages/container';

function App() {
  const ref = useRef([]);
  const [data, setData] = useState(1);
  return (
    <>
      <button
        onClick={() => {
          ref.current.push(1);
        }}
      >
        点击 ref
      </button>
      <button
        onClick={() => {
          setData(2);
        }}
      >
        点击 setData
      </button>
    </>
  );
}

// ReactDOM.render(
//   <React.StrictMode>
//     <Container />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
ReactDOM.render(<App></App>, document.getElementById('root'));
