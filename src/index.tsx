import React from "react";
import ReactDOM from "react-dom/client";
import AppView from "./view/app-view";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <AppView />
  </React.StrictMode>,
);

reportWebVitals();
