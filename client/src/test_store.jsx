import { useCallback, useEffect, useState } from "react";

const createStore = initialState => {
  let state = initialState;

  const listeners = new Set();

  const getState = () => state;

  const setState = fn => {
    state = fn(state);
    listeners.forEach(l => l());
  };

  const subscribe = listener => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return { getState, setState, subscribe };
};

const useStore = (store, selector) => {
  const [state, setState] = useState(() => selector(store.getState()));
  useEffect(() => {
    const callback = () => setState(selector(store.getState()));
    const unsubscribe = store.subscribe(callback);
    callback();
    return unsubscribe;
  }, [store, selector]);
  return state;
};

const store = createStore({ count: 0, text: "hello" });

const Counter = () => {
  const count = useStore(
    store,
    useCallback(state => state.count, [])
  );

  const inc = () => {
    store.setState(state => ({
      ...state,
      count: state.count + 1,
    }));
  };

  return (
    <div>
      {count}
      <button onClick={inc}>+1</button>
    </div>
  );
};

const TextBox = () => {
  const text = useStore(
    store,
    useCallback(state => state.text, [])
  );

  const setText = e => {
    store.setState(state => ({
      ...state,
      text: e.target.value,
    }));
  };

  return (
    <div>
      <input type="text" value={text} onChange={setText} />
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <Counter />
      <Counter />
      <TextBox />
      <TextBox />
    </div>
  );
}
