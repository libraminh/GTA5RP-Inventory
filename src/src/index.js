import React from "react";
import ReactDOM from "react-dom";

// import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "@/store";

// Components
import App from "./App";

// css
import "./App.less";
import "assets/css/main.scss";
import StoreWrapper from "./store/appContext";

// export const store = configureStore({
//   reducer: rootReducer,
// });

ReactDOM.render(
  <StoreWrapper>
    <App />
  </StoreWrapper>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
