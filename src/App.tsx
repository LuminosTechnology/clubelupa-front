import { StatusBar, Style } from "@capacitor/status-bar";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, { useEffect } from "react";

import AffiliateArea from "./pages/AffiliateArea/AffiliateArea";
import AffiliateEdit from "./pages/AffiliateEdit/AffiliateEdit";
import AffiliateApprovedRegisterSuccess from "./pages/AffiliateRegister/AffiliateApprovedRegisterSuccess";
import AffiliatePendingApprovalRegisterSuccess from "./pages/AffiliateRegister/AffiliatePendingApprovalRegisterSuccess";
import AffiliateRegister from "./pages/AffiliateRegister/AffiliateRegister";
import AffiliateStores from "./pages/AffiliateStores/AffiliateStoresPage";
import AffiliateView from "./pages/AffiliateView/AffiliateView";
import Experience from "./pages/Experience/Experience";
import Favorites from "./pages/Favorites/Favorites";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ForgotPassword/ChangePassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LupoCoins from "./pages/LupoCoins/LupoCoins";
import MyPlan from "./pages/MyPlan/MyPlan";
import Notification from "./pages/Notification/Notification";
import ProfilePage from "./pages/Profile/ProfilePage";
import ProfilePageEdit from "./pages/ProfileEdit/ProfileEditPage";
import ReccomendAndWin from "./pages/RecommendAndWin/RecommendAndWin";
import Register from "./pages/Register";
import RegisterSuccess from "./pages/Register/RegisterSuccess";
import ScannerNote from "./pages/ScannerNote/ScannerNote";
import TalkToUs from "./pages/TalkToUs/TalkToUs";
import UpgradePlan from "./pages/UpgradePlan/UpgradePlan";

import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/palettes/dark.system.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import { PrivateRoute, PublicRoute } from "./components/Routes";
import { useAuthContext } from "./contexts/AuthContext";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import "./theme/variables.css";

import {
  LOG_LEVEL,
  Purchases,
  PurchasesPlugin,
} from "@revenuecat/purchases-capacitor";
import { Redirect } from "react-router";
import { GlobalFonts } from "./styles/GlobalFonts";

declare global {
  interface Window {
    Purchases?: PurchasesPlugin;
  }
}

setupIonicReact();

const App: React.FC = () => {
  const { isAuthenticated, loading, user } = useAuthContext();

  useEffect(() => {
    (async () => {
      try {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: "#fff" });
      } catch {}
    })();
  }, []);

  useEffect(() => {
    const setUpRevenueCat = async () => {
      if (!Purchases) return;
      if (!user) return;

      await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
      await Purchases.configure({
        apiKey: "goog_KxFoVBiQbkVTqqxwfazoyszXRtq",
        appUserID: String(user.id),
      });

      window.Purchases = Purchases;
    };

    setUpRevenueCat();
  }, [user, loading, isAuthenticated]);

  if (loading) return <div>Loading...</div>;

  return (
    <IonApp>
      <GlobalFonts />
      <IonReactRouter>
        <IonRouterOutlet>
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/register" component={Register} />
          <PublicRoute
            exact
            path="/register/success"
            component={RegisterSuccess}
          />
          <PublicRoute
            exact
            path="/register/verify-email"
            component={VerifyEmail}
          />
          <PublicRoute
            exact
            path="/register/affiliate"
            component={AffiliateRegister}
          />
          <PublicRoute
            exact
            path="/register/affiliate/approved/success"
            component={AffiliateApprovedRegisterSuccess}
          />
          <PublicRoute
            exact
            path="/register/affiliate/pending/success"
            component={AffiliatePendingApprovalRegisterSuccess}
          />
          <PublicRoute
            exact
            path="/forgot/password"
            component={ForgotPassword}
          />
          <PublicRoute
            exact
            path="/change/password"
            component={ChangePassword}
          />

          <PrivateRoute exact path="/lupacoins" component={LupoCoins} />
          <PrivateRoute
            exact
            path="/affiliate/area"
            component={AffiliateArea}
          />
          <PrivateRoute
            exact
            path="/affiliate/area/edit"
            component={AffiliateEdit}
          />
          <PrivateRoute exact path="/affiliates" component={AffiliateStores} />
          <PrivateRoute
            exact
            path="/affiliate-view/:id"
            component={AffiliateView}
          />
          <PrivateRoute exact path="/profile" component={ProfilePage} />
          <PrivateRoute
            exact
            path="/profile/edit"
            component={ProfilePageEdit}
          />
          <PrivateRoute
            exact
            path="/profile/notification"
            component={Notification}
          />
          <PrivateRoute exact path="/profile/talktous" component={TalkToUs} />
          <PrivateRoute
            exact
            path="/recommendandwin"
            component={ReccomendAndWin}
          />
          <PrivateRoute exact path="/myplan" component={MyPlan} />
          <PrivateRoute exact path="/myplan/upgrade" component={UpgradePlan} />
          <PrivateRoute exact path="/experience" component={Experience} />
          <PrivateRoute exact path="/favorites" component={Favorites} />
          <PrivateRoute
            exact
            path="/affiliate/scanner"
            component={ScannerNote}
          />
          <PrivateRoute exact path="/home" component={Home} />

          <Redirect exact from="/" to={isAuthenticated ? "/home" : "/login"} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
