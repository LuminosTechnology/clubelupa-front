// src/pages/Vouncher/Vouncher.tsx
import {
  IonAlert,
  IonContent,
  IonIcon,
  IonModal,
  IonPage,
  IonSpinner,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import AppHeader from "../../components/SimpleHeader";

import VoucherArt from "../../assets/moeda.svg?react";

import {
  BalanceAmount,
  BalanceContainer,
  BalanceLabel,
  CloseVoucherButton,
  ContentContainer,
  CustomModal,
  CustomModalContent,
  DescriptionText,
  DescriptionTitle,
  EstablishmentName,
  IconContainer,
  ScrollArea,
  ViewMore,
  VoucherButton,
  VoucherCategory,
  VoucherContent,
  VoucherImage,
  VoucherSection,
  VoucherText,
  VouncherCategory,
  VouncherQuantity,
  VouncherTitle,
  VouncherWrapper,
} from "./LupoCoins.style";

import { useHistory } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext";
import { useGamificationContext } from "../../contexts/GamificationContext";
import { ExperienceService } from "../../services/experiencesService";
import { Experience } from "../../types/api/experiences";
import {
  Container,
  ListWrapper,
} from "../AffiliateFavorites/AffiliateFavorites.style";

const LupoCoins: React.FC = () => {
  const history = useHistory();
  const [showFooter, setShowFooter] = useState(false);
  const [displayPaymentWarning, setDisplayPaymentWarning] = useState(false);

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selected, setSelected] = useState<Experience | undefined>();

  const { gamificationSummary } = useGamificationContext();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) return;
    if (!user.is_payed) {
      setDisplayPaymentWarning(true);
    }

    const fetchExperiences = async () => {
      setIsLoading(true);
      try {
        const response = await ExperienceService.getExperiences();
        setExperiences(response);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperiences();
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
        message={`Área exclusiva para sócios Lupa: aqui você troca suas moedas por experiências únicas em Curitiba. Torne-se sócio e venha desbloquear esse mundo com a gente!`}
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
              {isLoading && <IonSpinner color="primary" />}
              {experiences.map((item) => (
                <VouncherWrapper key={item.id}>
                  <IconContainer>
                    {item.image_url ? (
                      <img src={item.image_url} alt="Voucher" />
                    ) : (
                      <VoucherArt />
                    )}
                  </IconContainer>
                  <ContentContainer>
                    <VouncherTitle>{item.title}</VouncherTitle>
                    <VouncherCategory>{item.category?.name}</VouncherCategory>
                    <VouncherQuantity>
                      {item.cost_in_coins}&nbsp;LupaCoins
                    </VouncherQuantity>
                    <ViewMore
                      onClick={() => {
                        setSelected(item);
                        setShowFooter(true);
                      }}
                    >
                      Ver Mais
                    </ViewMore>
                  </ContentContainer>
                </VouncherWrapper>
              ))}
            </ListWrapper>
          </Container>

          <CustomModal
            isOpen={showFooter}
            onDidDismiss={() => {
              setShowFooter(false);
              setSelected(undefined);
            }}
            breakpoints={[0, 0.8]}
            initialBreakpoint={0.8}
            handleBehavior="cycle"
          >
            <CustomModalContent>
              {selected?.image_url && (
                <VoucherImage src={selected.image_url} alt="Voucher" />
              )}

              <VoucherContent>
                <VoucherSection>
                  {selected?.establishment && (
                    <EstablishmentName>
                      {selected.establishment.name}
                    </EstablishmentName>
                  )}
                  {selected?.category && (
                    <VoucherCategory>{selected.category.name}</VoucherCategory>
                  )}
                </VoucherSection>

                <VoucherSection>
                  <DescriptionTitle>Experiência Lupa</DescriptionTitle>
                  <DescriptionText>{selected?.description}</DescriptionText>
                </VoucherSection>

                <VoucherSection>
                  <VoucherText>
                    Você quer trocar {selected?.cost_in_coins} Moedas Lupa por
                    essa experiência?
                  </VoucherText>
                </VoucherSection>
                {selected?.can_redeem ? (
                  <VoucherButton>quero trocar minhas moedas lupa</VoucherButton>
                ) : (
                  <VoucherText>
                    Você não possui Moedas Lupa o suficiente
                  </VoucherText>
                )}

                <CloseVoucherButton onClick={() => setShowFooter(false)}>
                  <IonIcon icon={"close-outline"} size="large" />
                </CloseVoucherButton>
              </VoucherContent>
            </CustomModalContent>
          </CustomModal>
        </ScrollArea>
      </IonContent>
    </IonPage>
  );
};

export default LupoCoins;
