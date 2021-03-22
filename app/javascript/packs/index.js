import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { NpaContextProvider } from "./Context";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <NpaContextProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </NpaContextProvider>,
    document.body.appendChild(document.createElement("div"))
  );
});
