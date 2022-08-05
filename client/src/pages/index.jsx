import { useEffect } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import routers from "../router/config";

const Content = ({ children }) => {
  useEffect(() => {
    var ws = new WebSocket("ws://localhost:8181");

    ws.onopen = function () {
      console.log("Connection to server opened");
    };
  });

  return (
    <div>
      <BreadCrumb routes={routers} />

      {children}
    </div>
  );
};

export default Content;
