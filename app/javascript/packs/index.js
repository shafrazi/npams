import React from "react";
import ReactDOM from "react-dom";
import "react-calendar/dist/Calendar.css";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { NpaContextProvider } from "./Context";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <NpaContextProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </NpaContextProvider>
    </MuiPickersUtilsProvider>,
    document.body.appendChild(document.createElement("div"))
  );
});
