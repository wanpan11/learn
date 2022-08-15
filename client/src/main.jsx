// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/_init.less";
import App from "./router";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <App />
  // </StrictMode>
);
