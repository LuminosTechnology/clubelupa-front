import {
  IonContent,
  IonLoading,
  IonPage,
  IonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import SearchBar from "../../components/SearchButton/SearchBar";

import {
  AlphabetContainer,
  AlphabetLetter,
  ExploreButton,
  Paragraph,
  RowContainer,
  StoreCard,
  StoreImage,
  StoreInfo,
  StoreLine,
  StoreListContainer,
} from "./AffiliateFavorites.style";

import { fetchFavorites } from "../../services/affiliateService";

import AppHeader from "../../components/SimpleHeader";
import { useDebounce } from "../../hooks/useDebounce";
import { Establishment } from "../../types/api/api";
import Button from "../../components/Button";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const AffiliateFavoritesPage: React.FC = () => {
  const history = useHistory();
  const firstLetters = new Set<string>();

  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const debouncedSearchValue = useDebounce(query, 300);

  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const handleSelectLetter = (clientY: number) => {
    const container = document.getElementById("alphabet-scroll");
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const relativeY = clientY - rect.top;

    const letterHeight = rect.height / alphabet.length;
    let index = Math.floor(relativeY / letterHeight);

    if (index < 0) index = 0;
    if (index >= alphabet.length) index = alphabet.length - 1;

    const letter = alphabet[index];
    setSelectedLetter(letter);
    scrollToLetter(letter);
  };

  const handleTouch = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleSelectLetter(touch.clientY);
  };

  const handleMouse = (e: React.MouseEvent) => {
    if (e.buttons) {
      // Only if mouse is pressed
      handleSelectLetter(e.clientY);
    }
  };

  /* ─── carrega da API ───────────────────────────────────────────── */
  const fetchEstablishments = async () => {
    const response = await fetchFavorites({ query: debouncedSearchValue });
    setEstablishments(response.data);
  };
  useEffect(() => {
    fetchEstablishments();
  }, [debouncedSearchValue]);
  useIonViewWillEnter(() => {
    fetchEstablishments();
  });

  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(letter);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const containerRef = useRef<HTMLIonContentElement>(null);

  const handleGoToAffiliates = () => {
    history.replace("/affiliates");
  };

  return (
    <IonPage style={{ "--background": "#ffffff" }}>
      <AppHeader
        title="Meus Favoritos"
        backgroundColor="#E6C178"
        textColor="#FFFFFF"
      />
      <IonContent
        ref={containerRef}
        fullscreen
        style={{ "--background": "#ffffff", "--offset-bottom": "400px" }}
      >
        <IonLoading isOpen={loading} message="Carregando afiliados…" />
        <IonToast
          isOpen={!!error}
          message={error}
          color="danger"
          duration={4000}
          onDidDismiss={() => setError(undefined)}
        />

        <SearchBar value={query} onChange={setQuery} placeholder="Procurar" />
        <RowContainer>
          <StoreListContainer>
            {establishments.length === 0 && (
              <>
                <Paragraph>Você ainda não tem favoritos.</Paragraph>
                <ExploreButton onClick={handleGoToAffiliates}>
                  Explorar
                </ExploreButton>
              </>
            )}
            {establishments.map((establishment) => {
              const firstLetter = establishment.name.charAt(0).toUpperCase();
              let sectionId;

              if (!firstLetters.has(firstLetter)) {
                firstLetters.add(firstLetter);
                sectionId = firstLetter;
              }

              return (
                <StoreCard
                  key={establishment.id}
                  id={sectionId}
                  onClick={() =>
                    history.push(`/affiliate-view/${establishment.id}`)
                  }
                >
                  <StoreImage
                    src={
                      establishment.cover_photo_url ??
                      "/assets/default-photo.png"
                    }
                    alt={establishment.name}
                  />

                  <StoreInfo
                    style={{
                      background:
                        establishment.categories[0]?.color ?? "#E6C178",
                    }}
                  >
                    <StoreLine>{establishment.name}</StoreLine>
                    {!!establishment.categories[0] && (
                      <StoreLine>{establishment.categories[0].name}</StoreLine>
                    )}
                    {/* {!!s.horario && <StoreLine>{s.schedule}</StoreLine>} */}
                    {/* {!!s.benefits && <StoreLine>{s.benefits}</StoreLine>} */}
                  </StoreInfo>
                </StoreCard>
              );
            })}
          </StoreListContainer>

          <AlphabetContainer
            id="alphabet-scroll"
            onTouchStart={handleTouch}
            onTouchMove={handleTouch}
            onMouseDown={handleMouse}
            onMouseMove={handleMouse}
          >
            {alphabet.split("").map((letter) => (
              <AlphabetLetter
                disabled
                key={letter}
                className={selectedLetter === letter ? "active" : ""}
                onClick={() => scrollToLetter(letter)}
              >
                {letter}
              </AlphabetLetter>
            ))}
          </AlphabetContainer>
        </RowContainer>
      </IonContent>
    </IonPage>
  );
};

export default AffiliateFavoritesPage;
