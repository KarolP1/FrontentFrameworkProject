import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider } from "styled-components";
import { colorTheme } from "./themes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
console.log(colorTheme);
root.render(
  <Router>
    <ThemeProvider theme={colorTheme}>
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </ThemeProvider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
