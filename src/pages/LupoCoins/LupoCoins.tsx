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

import voucherIcon from "../../assets/Coins.svg";

const LupoCoins: React.FC = () => {
  const [showFooter, setShowFooter] = useState(false);
  const [expandTrigger, setExpandTrigger] = useState(0);

  const items = [
    { id: 1, name: "Alameda Simple Organic", category: "Cosméticos", quantity: "1500" },
    { id: 2, name: "Bio Verde", category: "Alimentação", quantity: "1000" },
    { id: 3, name: "Casa Natural", category: "Saúde", quantity: "300" },
    { id: 4, name: "Eco Shop", category: "Casa", quantity: "5000" },
  ];

  const handleViewMore = () => {
    if (!showFooter) setShowFooter(true);
    setExpandTrigger(prev => prev + 1);
  };

  return (
    <IonPage>
      <AppHeader
        title="Meus LupaCoins"
        backgroundColor="#E0A075"
        textColor="#FFFFFF"
      />

      <IonContent fullscreen style={{ "--background": "#FFFFFF" } as any}>
        <ScrollArea>
          <Container>

            <BalanceContainer>
              <BalanceLabel>Você tem:</BalanceLabel>
              <BalanceAmount>155&nbsp;LupaCoins</BalanceAmount>
            </BalanceContainer>

            <ListWrapper>
              {items.map(item => (
                <VouncherWrapper key={item.id}>
                  <IconContainer>
                    <img src={voucherIcon} alt="Voucher" />
                  </IconContainer>
                  <ContentContainer>
                    <VouncherTitle>{item.name}</VouncherTitle>
                    <VouncherCategory>{item.category}</VouncherCategory>
                    <VouncherQuantity>{item.quantity}&nbsp;LupaCoins</VouncherQuantity>
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

export default LupoCoins;
