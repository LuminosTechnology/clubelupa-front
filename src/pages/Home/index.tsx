import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import type { Restaurant } from "../../components/Map";
import Map from "../../components/Map";
import { useAuthContext } from "../../contexts/AuthContext";

const Home: React.FC = () => {
  const history = useHistory();
  const { user } = useAuthContext();

  const [selectedAffiliate, setSelectedAffiliate] = useState<Restaurant | null>(
    null
  );

  const [searchValue, setSearchValue] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);

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
      <IonContent>
        <Header onSearchChange={setSearchValue} />
        <Map
          searchValue={searchValue}
          onViewMore={(affiliate) => {
            history.push(`/affiliate-view/${affiliate.id}`);
          }}
        />

        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
