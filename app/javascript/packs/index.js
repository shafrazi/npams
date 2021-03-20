import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { NpaContextProvider } from "./Context";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <NpaContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NpaContextProvider>,
    document.body.appendChild(document.createElement("div"))
  );
});
