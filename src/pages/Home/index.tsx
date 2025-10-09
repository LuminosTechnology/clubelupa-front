import {
  IonAlert,
  IonContent,
  IonPage,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
import Map from "../../components/Map";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSubscriptionAlert } from "../../hooks/useSubscriptionAlert";
import { HomeBottomSheet } from "./components/home-bottom-sheet";
import { StyledAlert, Teste } from "./home.style";
import { StatusBar, Style } from '@capacitor/status-bar';

const Home: React.FC = () => {
  const history = useHistory();
  const { user } = useAuthContext();  
  const { 
    displayPaymentWarning,
    alertMessage, 
    checkAndShowAlert,
    closeAlert
  } = useSubscriptionAlert();

  const [searchValue, setSearchValue] = useState("");

  const mapRef = useRef<HTMLIonContentElement>(null);
  const [mapReady, setMapReady] = useState(false);

  useIonViewWillEnter(() => {
    // Quando a tela entrar, marque o mapa como pronto para ser renderizado
    setMapReady(true);
  });

  /* ─── remove aria-hidden que o Google Maps injeta ──────────────── */
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "aria-hidden"
        ) {
          const element = mutation.target as HTMLElement;
          element.removeAttribute("aria-hidden");
        }
      });
    });

    const mapElement = document.getElementById("map");
    if (mapElement) {
      observer.observe(mapElement, {
        attributes: true,
        subtree: true,
        childList: true,
      });
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    checkAndShowAlert();
  }, [user, checkAndShowAlert]);

  useEffect(() => {
    // Faz a barra sobrepor a WebView (importante!)
    StatusBar.setOverlaysWebView({ overlay: true });

    // Define a cor da barra como transparente
    StatusBar.setBackgroundColor({ color: 'transparent' });

    // Define o estilo dos ícones como claro (brancos)
    StatusBar.setStyle({ style: Style.Light });
  }, []);
  
  return (
    <Teste>
      <IonPage>
        <StyledAlert
          isOpen={displayPaymentWarning}
          title={`Seja bem-vindo(a) ao Lupa!`}
          message={
            `Seu espaço está quase garantido!\n\n` +
            `Para oficializar e concluir o cadastro, oficialize a sua assinatura como afiliado Lupa!\n\n` +
            `(${alertMessage})`
          }
          cssClass="alert-multiline"
          buttons={[
            {
              text: "Deixar para depois",
              role: "cancel",
              handler: () => {
                closeAlert();
              },
            },
            {
              text: "Assinar agora",
              role: "confirm",
              handler: () => {
                closeAlert();
                history.push("/affiliate/paywall");
              },
            },
          ]}
        />
        <IonContent scrollY={false}>
          <Header onSearchChange={setSearchValue} />
          <Map
            searchValue={searchValue}
            mapReady={mapReady}
            onViewMore={(affiliate) => {
              history.push(`/affiliate-view/${affiliate.id}`);
            }}
          />
          <HomeBottomSheet />
        </IonContent>
      </IonPage>
    </Teste>
  );
};

export default Home;