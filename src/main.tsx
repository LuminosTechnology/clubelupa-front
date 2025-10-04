import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { GamificationProvider } from "./contexts/GamificationContext";
import { ParametersProvider } from "./contexts/ParametersContext";
import { NotificationsProvider } from "./contexts/NotificationsContext";
import { PopupProvider } from "./contexts/PopupContext";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <AuthContextProvider>
    <GamificationProvider>
      <ParametersProvider>
        <NotificationsProvider>
          <PopupProvider>
            <App />
          </PopupProvider>
        </NotificationsProvider>
      </ParametersProvider>
    </GamificationProvider>
  </AuthContextProvider>
);
