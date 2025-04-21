// src/pages/AffiliateStores/AffiliateStoresPage.tsx
import React, { useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";

import AppHeader from "../../components/SimpleHeader";
import SlideMenu from "../../components/SlideMenu";
import SearchBar from '../../components/SearchButton/SearchBar';

import {
  ScrollArea,
  Container,
  SearchBarWrapper,
  SearchIcon,
  SearchInput,
  ListWrapper,
  StoreCard,
  StoreImage,
  StoreInfo,
  StoreLine,
} from "./AffiliateStoresPage.style";

import menuIcon from "../../assets/Menu.svg";
import searchIcon from "../../assets/lupa-search.svg";
import sampleImg from "../../assets/sample-store.png";

export interface Store {
  id: number;
  name: string;
  category: string;
  schedule: string;
  benefits: string;
  color: string;
  img: string;
}

export const stores: Store[] = [
  { id: 1, name: "Alameda Simple Organic", category: "Cosméticos", schedule: "Seg‑Sex 09:00 às 18:00", benefits: "10% de desconto", color: "#E6C178", img: sampleImg },
  { id: 2, name: "Bio Verde", category: "Alimentação", schedule: "Seg‑Sab 08:00 às 20:00", benefits: "Brinde na compra", color: "#8E9455", img: sampleImg },
  { id: 3, name: "Casa Natural", category: "Saúde", schedule: "Seg‑Sex 10:00 às 19:00", benefits: "Frete grátis", color: "#E0A075", img: sampleImg },
  { id: 4, name: "Eco Shop", category: "Casa", schedule: "Todos os dias 09:00 às 21:00", benefits: "Amostra grátis", color: "#E6C178", img: sampleImg },
];

const AffiliateStoresPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const history = useHistory();

  return (
    <IonPage>
      <AppHeader
        title="Afiliados"
        backgroundColor="#E6C178"
        textColor="#FFFFFF"
        menuIcon={menuIcon}
        onMenuClick={() => setIsMenuOpen(true)}
      />
      <SlideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <IonContent fullscreen style={{ "--background": "#FFFFFF" } as React.CSSProperties}>
        <ScrollArea>
          <Container>
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="O que você procura hoje?"
              iconSrc={searchIcon}
            />

            <ListWrapper>
              {stores
                .filter(s => s.name.toLowerCase().includes(query.toLowerCase().trim()))
                .map(store => (
                  <StoreCard
                    key={store.id}
                    onClick={() => history.push(`/affiliate-view/${store.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <StoreImage src={store.img} alt={store.name} />
                    <StoreInfo style={{ background: store.color }}>
                      <StoreLine>{store.name}</StoreLine>
                      <StoreLine>{store.category}</StoreLine>
                      <StoreLine>{store.schedule}</StoreLine>
                      <StoreLine>{store.benefits}</StoreLine>
                    </StoreInfo>
                  </StoreCard>
                ))}
            </ListWrapper>
          </Container>
        </ScrollArea>
      </IonContent>
    </IonPage>
  );
};

export default AffiliateStoresPage;
