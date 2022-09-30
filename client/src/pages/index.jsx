import { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import routers from "../router/config";

// var ws = new WebSocket("ws://localhost:8181");

// ws.onopen = function () {
//   console.log("Connection to server opened");
// };

const Content = ({ children, title }) => {
  console.log("Content ===> render", title);
  const [num, setNum] = useState(0);

  useEffect(() => {
    console.log("Content ===> useEffect");

    return () => {
      console.log("Content ===> useEffect return");
    };
  });

  return (
    <div>
      <BreadCrumb routes={routers} />

      {children}

      <button
        onClick={() => {
          setNum(draft => draft + 1);
        }}
      >
        {num}
      </button>
    </div>
  );
};

export default Content;
