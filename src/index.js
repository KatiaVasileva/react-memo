import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import SimpleModeProvider from "./context/SimpleModeContext";
import LevelProvider from "./context/LevelContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LevelProvider>
      <SimpleModeProvider>
        <RouterProvider router={router}></RouterProvider>
      </SimpleModeProvider>
    </LevelProvider>
  </React.StrictMode>,
);
