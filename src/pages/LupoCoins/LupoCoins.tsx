// src/pages/Vouncher/Vouncher.tsx
import { IonAlert, IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import FooterVoucher from "../../components/Footer-LupaCoins/FooterLupaCoins";
import AppHeader from "../../components/SimpleHeader";

import {
  Container,
  ListWrapper,
} from "../AffiliateStores/AffiliateStoresPage.style";

import {
  BalanceAmount,
  BalanceContainer,
  BalanceLabel,
  ContentContainer,
  IconContainer,
  ScrollArea,
  ViewMore,
  VouncherCategory,
  VouncherQuantity,
  VouncherTitle,
  VouncherWrapper,
} from "./LupoCoins.style";

import { useHistory } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext";
import { useGamificationContext } from "../../contexts/GamificationContext";
import { experiencias } from "../../contexts/mock";

const LupoCoins: React.FC = () => {
  const history = useHistory();
  const [showFooter, setShowFooter] = useState(false);
  const [expandTrigger, setExpandTrigger] = useState(0);
  const [displayPaymentWarning, setDisplayPaymentWarning] = useState(false);
  const { gamificationSummary } = useGamificationContext();
  const { user } = useAuthContext();

  const handleViewMore = () => {
    if (!showFooter) setShowFooter(true);
    setExpandTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    if (user?.subscription && user.subscription.status === "active") {
      //do nothing
    } else {
      setDisplayPaymentWarning(true);
    }
  }, []);

  return (
    <IonPage>
      <IonAlert
        isOpen={displayPaymentWarning}
        onDidDismiss={() => {
          setDisplayPaymentWarning(false);
          history.replace("/myplan");
        }}
        title="Atenção"
        message={`Ainda não detectamos o seu pagamento. Você pode comprar agora para ter acesso a todos os recursos.`}
        buttons={["OK"]}
      />
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
              <BalanceAmount>
                {gamificationSummary?.coins_balance} Moedas Lupa
              </BalanceAmount>
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
