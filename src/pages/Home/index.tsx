import {
  IonAlert,
  IonContent,
  IonPage,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import Header from "../../components/Header";
import Map from "../../components/Map";
import { useAuthContext } from "../../contexts/AuthContext";
import { HomeBottomSheet } from "./components/home-bottom-sheet";

const Home: React.FC = () => {
  const history = useHistory();
  const { user } = useAuthContext();
  const [displayPaymentWarning, setDisplayPaymentWarning] = useState(false);

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
    if (user) {
      if (user.is_affiliate && !user.is_payed) {
        setDisplayPaymentWarning(true);
      }
    }
  }, []);

  return (
    <IonPage>
      <IonAlert
        isOpen={displayPaymentWarning}
        title="Atenção"
        message={`Seu espaço está quase garantido! Para oficializar e concluir o cadastro, oficialize a sua assinatura como afiliado Lupa!`}
        buttons={[
          {
            text: "DEIXAR PARA DEPOIS",
            role: "cancel",
            handler: () => {
              setDisplayPaymentWarning(false);
            },
          },
          {
            text: "CONCLUIR AGORA",
            role: "confirm",
            handler: () => {
              setDisplayPaymentWarning(false);
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
