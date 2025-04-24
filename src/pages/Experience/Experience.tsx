// src/pages/AffiliateStores/AffiliateStoresPage.tsx
import React, { useState } from "react";
import { IonPage, IonContent } from "@ionic/react";

import AppHeader from "../../components/SimpleHeader";
import SearchBar from '../../components/SearchButton/SearchBar';

import {
  ScrollArea,
  Container,
  ListWrapper,
  StoreCard,
  StoreImage,
  StoreInfo,
  StoreLine,
  StoreLineLink,
} from "./Experience.style";

import searchIcon from "../../assets/lupa-search.svg";
import sampleImg from "../../assets/sample-store.png";

export interface Store {
  id: number;
  name: string;
  category: string;
  img: string;
}

export const stores: Store[] = [
  { id: 1, name: "Alameda Simple Organic", category: "Cosméticos", img: sampleImg },
  { id: 2, name: "Bio Verde", category: "Alimentação", img: sampleImg },
  { id: 3, name: "Casa Natural", category: "Saúde", img: sampleImg },
  { id: 4, name: "Eco Shop", category: "Casa", img: sampleImg },
];

const Experience: React.FC = () => {
  const [query, setQuery] = useState("");

  const filteredStores = stores.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase().trim())
  );

  return (
    <IonPage>
      <AppHeader
        title="Histórico de Exp."
        backgroundColor="#E0A075"
        textColor="#FFFFFF"
      />

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
              {filteredStores.map(store => (
                <StoreCard key={store.id}>
                  <StoreImage src={store.img} alt={store.name} />
                  <StoreInfo>
                    <StoreLine>{store.name}</StoreLine>
                    <StoreLine>{store.category}</StoreLine>
                    <StoreLine>Horário de funcionamento</StoreLine>
                    <StoreLineLink href="/home">Benefícios</StoreLineLink>
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

export default Experience;
