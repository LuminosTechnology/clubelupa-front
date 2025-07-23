// src/pages/Vouncher/Vouncher.tsx
import React, { useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import AppHeader from "../../components/SimpleHeader";
import FooterVoucher from "../../components/Footer-LupaCoins/FooterLupaCoins";

import {
  Container,
  ListWrapper,
} from "../AffiliateStores/AffiliateStoresPage.style";

import {
  ScrollArea,
  BalanceContainer,
  BalanceLabel,
  BalanceAmount,
  VouncherWrapper,
  IconContainer,
  ContentContainer,
  VouncherTitle,
  VouncherCategory,
  VouncherQuantity,
  ViewMore,
} from "./LupoCoins.style";

import voucherIcon from "../../assets/moeda.svg";
import { experiencias } from "../../contexts/mock";

const LupoCoins: React.FC = () => {
  const [showFooter, setShowFooter] = useState(false);
  const [expandTrigger, setExpandTrigger] = useState(0);

  const handleViewMore = () => {
    if (!showFooter) setShowFooter(true);
    setExpandTrigger((prev) => prev + 1);
  };

  return (
    <IonPage>
      <AppHeader
        title="Minhas Moedas Lupa"
        backgroundColor="#E0A075"
        textColor="#FFFFFF"
      />

      <IonContent fullscreen style={{ "--background": "#FFFFFF" } as any}>
        <ScrollArea>
          <Container>
            <BalanceContainer>
              <BalanceLabel>Você tem:</BalanceLabel>
              <BalanceAmount>155&nbsp;Moedas Lupa</BalanceAmount>
            </BalanceContainer>

            <ListWrapper>
              {experiencias.map((item) => (
                <VouncherWrapper key={item.id}>
                  <IconContainer>
                    <img src={item.image} alt="Voucher" />
                  </IconContainer>
                  <ContentContainer>
                    <VouncherTitle>{item.name}</VouncherTitle>
                    <VouncherCategory>{item.category}</VouncherCategory>
                    <VouncherQuantity>
                      {item.price}&nbsp;LupaCoins
                    </VouncherQuantity>
                    <ViewMore onClick={handleViewMore}>Ver Mais</ViewMore>
                  </ContentContainer>
                </VouncherWrapper>
              ))}
            </ListWrapper>
          </Container>

          {showFooter && (
            <FooterVoucher visible={showFooter} expandTrigger={expandTrigger} />
          )}
        </ScrollArea>
      </IonContent>
    </IonPage>
  );
};

export default LupoCoins;
