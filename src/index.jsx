import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import App from "./App";

ReactDOM.render(
  <Router>
    <CssBaseline />
    <App />
  </Router>,
  document.querySelector("#root")
);
