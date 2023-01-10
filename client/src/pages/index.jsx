import { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import routers from "../router/config";

// const ws = new WebSocket("ws://localhost:8181");
// ws.onopen = function () {
//   console.log("Connection to server opened");

//   ws.send("hello word!");
// };

const Content = ({ children }) => {
  console.log("Content  ===> render");

  useEffect(() => {
    console.log("Content ===> useEffect");
  });

  return (
    <div>
      <BreadCrumb routes={routers} />

      {children}
    </div>
  );
};

export default Content;
