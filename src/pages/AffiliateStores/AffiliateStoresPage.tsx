import { IonContent, IonLoading, IonPage, IonToast } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import SearchBar from "../../components/SearchButton/SearchBar";

import {
  AlphabetContainer,
  AlphabetLetter,
  Container,
  RowContainer,
  StoreCard,
  StoreImage,
  StoreInfo,
  StoreLine,
  StoreListContainer,
  StoreName,
  StoreUnderlined,
} from "./AffiliateStoresPage.style";

import { getAllEstablishments } from "../../services/affiliateService";

import AppHeader from "../../components/SimpleHeader";
import { useDebounce } from "../../hooks/useDebounce";
import { Establishment } from "../../types/api/api";
import { CategoryFilter } from "./components/filters";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const AffiliateStoresPage: React.FC = () => {
  const history = useHistory();
  const firstLetters = new Set<string>();

  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const debouncedSearchValue = useDebounce(query, 300);

  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [categoriesFilter, setCategoriesFilter] = useState<number[]>([]);

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
  useEffect(() => {
    const fetchEstablishments = async () => {
      setLoading(true);
      const response = await getAllEstablishments(
        debouncedSearchValue,
        categoriesFilter
      );
      setEstablishments(response.data);
      setLoading(false);
    };

    fetchEstablishments();
  }, [debouncedSearchValue, categoriesFilter]);

  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(letter);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };
  console.log({ categoriesFilter });

  const containerRef = useRef<HTMLIonContentElement>(null);

  const handleStructure = (establishment: Establishment) => {
    switch (Number(establishment.structure_type)) {
      case 1:
        return "Física";
      case 2:
        return "Física e Online";
      case 3:
        return "Online";
      default:
        return "Desconhecido";
    }
  };

  return (
    <IonPage style={{ "--background": "#ffffff" }}>
      <CategoryFilter
        isOpen={isFilterOpen}
        onFilter={(ids) => {
          setCategoriesFilter(ids);
          setIsFilterOpen(false);
        }}
      />
      <AppHeader
        title="Afiliados"
        backgroundColor="#E6C178"
        textColor="#FFFFFF"
      />
      <IonContent
        ref={containerRef}
        style={{ "--background": "#ffffff" }}
        fullscreen
      >
        <IonLoading isOpen={loading} message="Carregando afiliados…" />
        <IonToast
          isOpen={!!error}
          message={error}
          color="danger"
          duration={4000}
          onDidDismiss={() => setError(undefined)}
        />
        <Container>
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Procurar"
            onFilterClick={() => setIsFilterOpen(true)}
          />

          <StoreListContainer>
            {establishments.map((establishment) => {
              if (!establishment || !establishment.name || !establishment.id)
                return null;
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
                      establishment.shop_photo_url ??
                      "/assets/default-photo.png"
                    }
                    alt={establishment.name}
                  />

                  <StoreInfo
                    style={{
                      background:
                        establishment.categories &&
                        establishment.categories.length > 0
                          ? establishment.categories[0]?.color ?? "#E6C178"
                          : "#E6C178",
                    }}
                  >
                    <StoreName>{establishment.name}</StoreName>
                    {establishment.categories &&
                      establishment.categories.length > 0 && (
                        <StoreLine>
                          Categoria: {establishment.categories[0].name}
                        </StoreLine>
                      )}
                    <StoreLine>
                      Estrutura: {handleStructure(establishment)}
                    </StoreLine>
                    <StoreUnderlined>Ver mais</StoreUnderlined>

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
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default AffiliateStoresPage;
