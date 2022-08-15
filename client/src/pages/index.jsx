import { useEffect } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import routers from "../router/config";

// var ws = new WebSocket("ws://localhost:8181");

// ws.onopen = function () {
//   console.log("Connection to server opened");
// };

const Content = ({ children, title }) => {
  console.log("Content ===> render", title);

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
