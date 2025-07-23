import React, { useEffect, useMemo, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import Header from "../../components/Header";
import Map from "../../components/Map";
import { getUserByToken } from "../../services/auth-service";
import Footer from "../../components/Footer";
import AffiliateFooter from "../../components/AffiliateFooter";
import CheckinSuccessFooter from "../../components/CheckinSuccessFooter";
import type { Restaurant } from "../../components/Map";
import { User } from "../../services/interfaces/Auth";
import { useHistory } from "react-router";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

if (!GOOGLE_MAPS_API_KEY) {
  console.warn("Google Maps API key is not defined in environment variables");
}

const Home: React.FC = () => {
  const history = useHistory();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedAffiliate, setSelectedAffiliate] = useState<Restaurant | null>(
    null
  );

  const [showSuccess, setShowSuccess] = useState(false);

  /* ─── usuário ─────────────────────────────────────────────────── */
  useEffect(() => {
    (async () => {
      try {
        const user = await getUserByToken();
        setUserData(user);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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

  /* ─── adaptador para o AffiliateFooter (espera .name) ──────────── */
  const affiliateForFooter = useMemo(() => {
    if (!selectedAffiliate) return null;
    return {
      ...selectedAffiliate,
      name: affiliateDisplayName, // garante compatibilidade
    };
  }, [selectedAffiliate, affiliateDisplayName]);

  return (
    <IonPage>
      <IonContent>
        <Header />
        <Map
          apiKey={GOOGLE_MAPS_API_KEY}
          onViewMore={(affiliate) => {
            history.push(`/affiliate-view/${affiliate.id}`);
            setShowSuccess(false);
          }}
        />

        {/* Footer padrão do usuário */}
        {userData && !affiliateForFooter && !showSuccess && (
          <Footer
            userData={{
              experiencia: 1,
              proximo_nivel: 1000,
              profile_photo: userData.profile_photo,
            }}
          />
        )}

        <AffiliateFooter
          visible={!!affiliateForFooter && !showSuccess}
          affiliate={affiliateForFooter}
          onClose={() => setSelectedAffiliate(null)}
          onAction={() =>
            history.push(`/affiliate-view/${affiliateForFooter.id}`)
          }
        />

        {/* Footer de sucesso de check-in */}
        {affiliateForFooter && showSuccess && (
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
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
