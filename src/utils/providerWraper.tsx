import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";
import { persistor, store } from "../../src/redux/store";
import { colorTheme } from "../themes";
import { BrowserRouter as Router } from "react-router-dom";

export const ProviderWraper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Router>
      <ThemeProvider theme={colorTheme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <React.StrictMode>{children}</React.StrictMode>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </Router>
  );
};
