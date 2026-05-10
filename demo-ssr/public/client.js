import { jsx } from "react/jsx-runtime";
import { hydrateRoot } from "react-dom/client";
import { App } from "./App";
import { INITIAL_DATA_KEY } from "./types";
const rootElement = document.getElementById("root");
const initialData = window[INITIAL_DATA_KEY];
if (!rootElement || !initialData) {
  throw new Error("Missing root element or initial SSR data.");
}
hydrateRoot(rootElement, /* @__PURE__ */ jsx(App, { initialData }));
//# sourceMappingURL=client.js.map
