import styles from "./index.module.less";
import { useState } from "react";

function List({ title }) {
  const [array, setArr] = useState([]);

  return (
    <div className={styles.title}>
      <h1>{title}</h1>

      <button
        onClick={() => {
          setArr(Array.from(new Array(10001).keys()).slice(1));
        }}
      >
        10000
      </button>

      <div className={styles.box}>
        <div className={styles.container}>
          {array.map(e => (
            <div key={e}>{e}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default List;
