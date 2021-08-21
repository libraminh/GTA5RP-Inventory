import React from "react";
import ReactDOM from "react-dom";

// Components
import App from "./App";

// css
import "./App.less";
import "assets/css/main.scss";
import StoreWrapper from "./store/appContext";

ReactDOM.render(
  <StoreWrapper>
    <App />
  </StoreWrapper>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
