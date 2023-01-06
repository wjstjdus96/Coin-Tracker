import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

ReactDOM.render(
  <div>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </div>,
  document.getElementById("root") as HTMLElement
);
