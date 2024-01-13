import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext";
import { TypeProvider } from "./context/UserTyepContext";

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <ThemeProvider>
    <BrowserRouter>
    <TypeProvider>
    <App />
    </TypeProvider>
    </BrowserRouter>
  </ThemeProvider>
);
