import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Header from "../../components/Header";
import Map from "../../components/Map";
import { HomeBottomSheet } from "./components/home-bottom-sheet";

const Home: React.FC = () => {
  const history = useHistory();

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

  return (
    <IonPage>
      <IonContent scrollY={false}>
        <Header onSearchChange={setSearchValue} />
        <Map
          searchValue={searchValue}
          onViewMore={(affiliate) => {
            history.push(`/affiliate-view/${affiliate.id}`);
          }}
        />
        {/* <Footer /> */}
        <HomeBottomSheet />
      </IonContent>
    </IonPage>
  );
};

export default Home;
