import { createRoot } from "react-dom/client";
import App from "./router";
import "./assets/css/_init.less";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
