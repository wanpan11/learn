// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/_init.less";
import App from "./router";
// import App from "./test";
// import App from "./test_store";
// import App from "./mobx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>
  <App />
);

// const tab_config = require.context("./components/", true, /.jsx/); // 获取左边组件大分类

// console.log("tab_config ===> ", tab_config.keys());
