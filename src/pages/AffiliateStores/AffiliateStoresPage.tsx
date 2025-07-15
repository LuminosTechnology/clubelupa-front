import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import SearchBar from "../../components/SearchButton/SearchBar";

import {
  AlphabetContainer,
  AlphabetLetter,
  Container,
  ListWrapper,
  RowContainer,
  StoreCard,
  StoreImage,
  StoreInfo,
  StoreLine,
  StoreListContainer,
} from "./AffiliateStoresPage.style";

import { getAllAffiliates } from "../../services/affiliateService";
import { AffiliateData } from "../../services/interfaces/Affiliate";

import sampleImg from "../../assets/sample-store.png";
import AppHeader from "../../components/SimpleHeader";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
interface CardStore {
  id: number;
  name: string;
  category?: string;
  schedule?: string;
  benefits?: string;
  color?: string;
  img?: string;
}

const MOCK_STORES: CardStore[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  .split("")
  .map((letter, idx) => ({
    id: idx,
    name: `${letter} Loja Exemplo`,
    category: "Categoria Teste",
    schedule: "9:00 - 18:00",
    benefits: "Desconto 10%",
    color: "#E6C178",
    img: sampleImg,
  }));

const mapToCard = (a: AffiliateData): CardStore => ({
  id: a.id,
  name: a.nome_local || a.nome_fantasia,
  category: a.categoria,
  schedule: a.horario_funcionamento,
  benefits: a.benefits,
  color: a.color ?? "#E6C178",
  img: a.foto_perfil ?? sampleImg,
});

const AffiliateStoresPage: React.FC = () => {
  const history = useHistory();

  const [affiliates, setAffiliates] = useState<CardStore[]>(MOCK_STORES);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

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
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setLoading(true);
  //       const data = await getAllAffiliates();
  //       setAffiliates(data.map(mapToCard));
  //     } catch (err: any) {
  //       setError(
  //         err?.response?.data?.message ??
  //           "Não foi possível carregar os afiliados."
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, []);

  const firstLetters: Set<string> = new Set<string>();

  /* ─── filtro local ─────────────────────────────────────────────── */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return affiliates;
    return affiliates.filter((s) => s.name.toLowerCase().includes(q));
  }, [affiliates, query]);

  const scrollToLetter = (letter: string) => {
    console.log({ letter });
    const element = document.getElementById(letter);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const containerRef = useRef<HTMLIonContentElement>(null);

  const scrollToTop = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollToTop(500);
  };

  return (
    <IonPage style={{ "--background": "#ffffff" }}>
      <AppHeader
        title="Afiliados"
        backgroundColor="#E6C178"
        textColor="#FFFFFF"
      />
      <IonContent
        ref={containerRef}
        fullscreen
        style={{ "--background": "#ffffff", "--offset-bottom": "400px" }}
      >
        <SearchBar value={query} onChange={setQuery} placeholder="Procurar" />
        <RowContainer>
          <StoreListContainer>
            {filtered.map((s) => {
              const firstLetter = s.name.charAt(0).toUpperCase();
              let sectionId;

              if (!firstLetters.has(firstLetter)) {
                firstLetters.add(firstLetter);
                sectionId = firstLetter;
              }

              return (
                <StoreCard
                  key={s.id}
                  id={sectionId}
                  onClick={() => history.push(`/affiliate-view/${s.id}`)}
                >
                  <StoreImage src={s.img} alt={s.name} />

                  <StoreInfo style={{ background: s.color }}>
                    <StoreLine>{s.name}</StoreLine>
                    {!!s.category && <StoreLine>{s.category}</StoreLine>}
                    {!!s.schedule && <StoreLine>{s.schedule}</StoreLine>}
                    {!!s.benefits && <StoreLine>{s.benefits}</StoreLine>}
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

export default AffiliateStoresPage;
