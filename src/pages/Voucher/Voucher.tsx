// src/pages/Vouncher/Vouncher.tsx
import React, { useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import AppHeader from "../../components/SimpleHeader";
import SlideMenu from "../../components/SlideMenu";
import FooterVoucher from "../../components/Footer-Voucher/FooterVoucher";
import SearchBar from '../../components/SearchButton/SearchBar';

import {
  Container,
  SearchBarWrapper,
  SearchIcon,
  SearchInput,
  ListWrapper,
} from "../AffiliateStores/AffiliateStoresPage.style";

import {
  ScrollArea,
  VouncherWrapper,
  IconContainer,
  ContentContainer,
  VouncherTitle,
  VouncherCategory,
  VouncherExpiry,
  ViewMore,
} from "./Voucher.style";

import menuIcon from "../../assets/Menu.svg";
import searchIcon from "../../assets/lupa-search.svg";
import voucherIcon from "../../assets/voucher.svg";

const Vouncher: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // controla se o footer está montado/exibido
  const [showFooter, setShowFooter] = useState(false);
  // incrementa toda vez que clicamos em "Ver Mais"
  const [expandTrigger, setExpandTrigger] = useState(0);

  const items = [
    { id: 1, name: "Alameda Simple Organic", category: "Cosméticos", expiry: "22/02" },
    { id: 2, name: "Bio Verde", category: "Alimentação", expiry: "22/02" },
    { id: 3, name: "Casa Natural", category: "Saúde", expiry: "22/02" },
    { id: 4, name: "Eco Shop", category: "Casa", expiry: "22/02" },
  ];

  const filtered = items.filter(i =>
    i.name.toLowerCase().includes(query.toLowerCase().trim())
  );

  const handleViewMore = () => {
    if (!showFooter) {
      setShowFooter(true);
    }
    // dispara expansão sempre
    setExpandTrigger(prev => prev + 1);
  };

  return (
    <IonPage>
      <AppHeader
        title="Meus Cupons"
        backgroundColor="#E6C178"
        textColor="#FFFFFF"
        menuIcon={menuIcon}
        onMenuClick={() => setIsMenuOpen(true)}
      />
      <SlideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <IonContent fullscreen style={{ "--background": "#FFFFFF" } as any}>
        <ScrollArea>
          <Container>
            <SearchBarWrapper>
              <SearchIcon src={searchIcon} alt="Buscar" />
              <SearchInput
                placeholder="O que você procura hoje?"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </SearchBarWrapper>

            <ListWrapper>
              {filtered.map(item => (
                <VouncherWrapper key={item.id}>
                  <IconContainer>
                    <img src={voucherIcon} alt="Voucher" />
                  </IconContainer>
                  <ContentContainer>
                    <VouncherTitle>{item.name}</VouncherTitle>
                    <VouncherCategory>{item.category}</VouncherCategory>
                    <VouncherExpiry>até dia {item.expiry}</VouncherExpiry>
                    <ViewMore onClick={handleViewMore}>
                      Ver Mais
                    </ViewMore>
                  </ContentContainer>
                </VouncherWrapper>
              ))}
            </ListWrapper>
          </Container>

          {showFooter && (
            <FooterVoucher
              visible={showFooter}
              expandTrigger={expandTrigger}
            />
          )}
        </ScrollArea>
      </IonContent>
    </IonPage>
  );
};

export default Vouncher;
