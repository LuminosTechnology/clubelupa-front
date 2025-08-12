import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import type { Restaurant } from "../../components/Map";
import Map from "../../components/Map";
import { useAuthContext } from "../../contexts/AuthContext";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

if (!GOOGLE_MAPS_API_KEY) {
  console.warn("Google Maps API key is not defined in environment variables");
}

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

  /* ─── nome pronto para o footer de sucesso ─────────────────────── */
  const affiliateDisplayName = useMemo(() => {
    if (!selectedAffiliate) return "";
    return (
      selectedAffiliate.nome_local ||
      selectedAffiliate.nome_fantasia ||
      "Afiliado"
    );
  }, [selectedAffiliate]);

  const affiliateForFooter = useMemo(() => {
    if (!selectedAffiliate) return null;
    return {
      ...selectedAffiliate,
      name: affiliateDisplayName,
    };
  }, [selectedAffiliate, affiliateDisplayName]);

  return (
    <IonPage>
      <IonContent>
        <Header onSearchChange={setSearchValue} />
        <Map
          searchValue={searchValue}
          apiKey={GOOGLE_MAPS_API_KEY}
          onViewMore={(affiliate) => {
            history.push(`/affiliate-view/${affiliate.id}`);
            setShowSuccess(false);
          }}
        />

        {/* Footer padrão do usuário */}
        {user && !affiliateForFooter && !showSuccess && <Footer />}
        {/* 
        <AffiliateFooter
          visible={true}
          affiliate={affiliateForFooter}
          onClose={() => setSelectedAffiliate(null)}
          onAction={() =>
            history.push(`/affiliate-view/${affiliateForFooter.id}`)
          }
        /> */}

        {/* Footer de sucesso de check-in */}
        {/* {affiliateForFooter && showSuccess && (
          <CheckinSuccessFooter
            affiliateName={affiliateDisplayName}
            coinsEarned={affiliateForFooter.value}
            onRedeem={() => {
              setShowSuccess(false);
              setSelectedAffiliate(null);
            }}
            onClose={() => {
              setShowSuccess(false);
              setSelectedAffiliate(null);
            }}
          />
        )} */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
