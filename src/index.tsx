import React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import App from "./App";
import "../sass/index.sass";
import { Provider } from "react-redux";
import { initStore } from "./store/modules";

const rootDom = document.getElementById("root");
if (rootDom) {
  const root = createRoot(rootDom);
  root.render(
    <Provider store={initStore}>
      <App />
    </Provider>
  );
}
