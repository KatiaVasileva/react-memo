import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import SimpleModeProvider from "./context/SimpleModeContext";
import LevelProvider from "./context/LevelContext";
import LeaderProvider from "./context/LeaderContext";
import SuperPowerProvider from "./context/SuperPowerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SuperPowerProvider>
      <LeaderProvider>
        <LevelProvider>
          <SimpleModeProvider>
            <RouterProvider router={router}></RouterProvider>
          </SimpleModeProvider>
        </LevelProvider>
      </LeaderProvider>
    </SuperPowerProvider>
  </React.StrictMode>,
);
