import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import SimpleModeProvider from "./context/SimpleModeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SimpleModeProvider>
      <RouterProvider router={router}></RouterProvider>
    </SimpleModeProvider>
  </React.StrictMode>,
);
