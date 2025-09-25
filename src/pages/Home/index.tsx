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

const Home: React.FC = () => {
  const history = useHistory();
  const { user } = useAuthContext();  
  const { 
    displayPaymentWarning, 
    setDisplayPaymentWarning, 
    timeRemaining, 
    alertNumber, 
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

  return (
    <IonPage>
      <IonAlert
        isOpen={displayPaymentWarning}
        title={`Alerta ${alertNumber}`}
        message={`${alertMessage}${timeRemaining ? `\n\nTempo restante: ${timeRemaining}.` : ""}\n\nSeu espaço está quase garantido!\nPara oficializar e concluir o cadastro, oficialize a sua assinatura como afiliado Lupa!`}
        buttons={[
          {
            text: "DEIXAR PARA DEPOIS",
            role: "cancel",
            handler: () => {
              closeAlert();
            },
          },
          {
            text: "CONCLUIR AGORA",
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
  );
};

export default Home;