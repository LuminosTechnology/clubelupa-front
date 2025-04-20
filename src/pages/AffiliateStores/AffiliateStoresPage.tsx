// src/pages/AffiliateStores/AffiliateStoresPage.tsx
import React, { useState } from "react";
import { IonPage, IonContent } from "@ionic/react";

import AppHeader from "../../components/SimpleHeader";
import SlideMenu from "../../components/SlideMenu";

import {
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

interface Store {
  id: number;
  name: string;
  category: string;
  schedule: string;
  benefits: string;
  color: string;
  img: string;
}

const stores: Store[] = [
  { id: 1, name: "Alameda Simple Organic", category: "Cosméticos", schedule: "Horário de funcionamento", benefits: "Benefícios", color: "#E6C178", img: sampleImg },
  { id: 2, name: "Alameda Simple Organic", category: "Cosméticos", schedule: "Horário de funcionamento", benefits: "Benefícios", color: "#8E9455", img: sampleImg },
  { id: 3, name: "Alameda Simple Organic", category: "Cosméticos", schedule: "Horário de funcionamento", benefits: "Benefícios", color: "#E0A075", img: sampleImg },
  { id: 4, name: "Alameda Simple Organic", category: "Cosméticos", schedule: "Horário de funcionamento", benefits: "Benefícios", color: "#E6C178", img: sampleImg },
];

const AffiliateStoresPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <Container>
          <SearchBarWrapper>
            <SearchIcon src={searchIcon} alt="Search" />
            <SearchInput
              placeholder="O que você procura hoje?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </SearchBarWrapper>

          <ListWrapper>
            {stores
              .filter((s) => s.name.toLowerCase().includes(query.toLowerCase().trim()))
              .map((store) => (
                <StoreCard key={store.id}>
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
      </IonContent>
    </IonPage>
  );
};

export default AffiliateStoresPage;
