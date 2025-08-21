import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { GamificationProvider } from "./contexts/GamificationContext";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <AuthContextProvider>
    <GamificationProvider>
      <App />
    </GamificationProvider>
  </AuthContextProvider>
);
