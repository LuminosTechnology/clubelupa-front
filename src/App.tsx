// src/App.tsx
import React, { useState, useEffect } from "react";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { getToken } from "./services/auth-service";
import { setupIonicReact } from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.system.css";
import "./theme/variables.css";

import { StatusBar, Style } from '@capacitor/status-bar';

import RegisterSuccess from "./pages/Register/RegisterSuccess";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ForgotPassword/ChangePassword";
import AffiliateRegister from "./pages/AffiliateRegister/AffiliateRegister";
import AffiliateRegisterSuccess from "./pages/AffiliateRegister/AffiliateRegisterSuccess";
import AffiliateArea from "./pages/AffiliateArea/AffiliateArea";
import AffiliateEdit from "./pages/AffiliateEdit/AffiliateEdit";
import ProfilePage from "./pages/Profile/ProfilePage";
import ProfilePageEdit from "./pages/ProfileEdit/ProfileEditPage"

setupIonicReact();

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      setIsAuthenticated(!!token);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#fff' });
      } catch {
        /** ignore */
      }
    })();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login" render={() =>isAuthenticated ? <Redirect to="/home" /> : <Login /> }/>
          <Route exact path="/register" component={Register} />
          <Route exact path="/affiliate-register"component={AffiliateRegister}/>
          <Route exact path="/profile"component={ProfilePage}/>
          <Route exact path="/profile-edit"component={ProfilePageEdit}/>
          <Route exact path="/affiliate-area" component={AffiliateArea} />
          <Route exact path="/affiliate-area-edit" component={AffiliateEdit}/>
          <Route exact path="/affiliate-register-success" component={AffiliateRegisterSuccess}/>
          <Route exact path="/register-success" component={RegisterSuccess} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/change-password" component={ChangePassword} />
          <Route exact path="/home" component={Home} />

          <Redirect
            exact
            from="/"
            to={isAuthenticated ? "/home" : "/login"}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
