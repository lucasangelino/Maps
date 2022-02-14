import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/core/App";
import { SocketProvider } from "./context/SocketContext";

ReactDOM.render(
  <React.StrictMode>
    <SocketProvider>
    <App />
    </SocketProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
