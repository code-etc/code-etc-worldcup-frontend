import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./reset.css";
import "./index.css";
import { worker } from "./mocks/server";
worker.start();

window.__mswStop = worker.stop;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);
