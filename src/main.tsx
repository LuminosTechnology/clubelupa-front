import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { GamificationProvider } from "./contexts/GamificationContext";
import { ParametersProvider } from "./contexts/ParametersContext";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <AuthContextProvider>
    <GamificationProvider>
      <ParametersProvider>
        <App />
      </ParametersProvider>
    </GamificationProvider>
  </AuthContextProvider>
);
