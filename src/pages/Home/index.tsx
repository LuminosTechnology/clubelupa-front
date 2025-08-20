import { IonAlert, IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Header from "../../components/Header";
import Map from "../../components/Map";
import { HomeBottomSheet } from "./components/home-bottom-sheet";
import { useAuthContext } from "../../contexts/AuthContext";

const Home: React.FC = () => {
  const history = useHistory();
  const { user } = useAuthContext();
  const [displayPaymentWarning, setDisplayPaymentWarning] = useState(false);

  const [searchValue, setSearchValue] = useState("");

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
        onDidDismiss={() => {
          setDisplayPaymentWarning(false);
          history.push("/affiliate/paywall");
        }}
        title="Atenção"
        message={
          "Detectamos que você afiliado, mas ainda não realizou o pagamento da assinatura. Você pode assinar agora para ter acesso a todos os recursos."
        }
        buttons={["OK"]}
      />
      <IonContent scrollY={false}>
        <Header onSearchChange={setSearchValue} />
        <Map
          searchValue={searchValue}
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
