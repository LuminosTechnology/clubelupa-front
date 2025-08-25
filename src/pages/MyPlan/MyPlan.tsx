// src/pages/MyPlan/MyPlan.tsx
import { IonContent, IonPage, IonSpinner, IonText } from "@ionic/react";
import React, { useEffect, useState } from "react";
import AppHeader from "../../components/SimpleHeader";

import {
  Avatar,
  AvatarWrapper,
  Benefit,
  BenefitsContainer,
  ButtonWrapper,
  InfoText,
  Paragraph,
  PlanValue,
  PremiumButton,
  Price,
  ProfileContainer,
  Title,
  UserName,
  UserSubInfo,
} from "./MyPlan.style";

import { Capacitor } from "@capacitor/core";
import { useAuthContext } from "../../contexts/AuthContext";

const MyPlan: React.FC = () => {
  const [premiumPackage, setPremiumPackage] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasPremium, setHasPremium] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user, refetchUser } = useAuthContext();

  useEffect(() => {
    refetchUser();
    if (user?.subscription && user.subscription.status === "active") {
      setHasPremium(true);
    }
  }, []);

  const handlePurchase = async () => {
    if (!premiumPackage) return;

    setIsLoading(true);
    setError(null);

    try {
      if (!window.Purchases) return;
      const { customerInfo } = await window.Purchases.purchasePackage({
        aPackage: premiumPackage,
      });
      alert("Parabéns! Você possui um plano premium!");
    } catch (error: any) {
      if (error.code === "PURCHASE_CANCELLED") {
      } else {
        if (error.code === "BILLING_UNAVAILABLE") {
          setError(
            "O serviço de compra não está disponível no seu dispositivo. Verifique a conexão com a Play Store."
          );
        } else if (error.code === "PRODUCT_NOT_AVAILABLE_FOR_PURCHASE") {
          setError("O produto não está disponível para compra.");
        } else {
          setError(
            `Erro ao fazer o checkout: ${
              error.message || error || "Desconhecido"
            }`
          );
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProductsAndCheckAccess = async () => {
    setIsLoading(true);
    setError(null);

    if (!Capacitor.isNativePlatform() || !window.Purchases) {
      setError("Funcionalidade de assinatura não disponível no dispositivo");
      setIsLoading(false);
      return;
    }

    try {
      const { customerInfo } = await window.Purchases.getCustomerInfo();
      const currentPremiumAccess =
        customerInfo.entitlements.active["socio_premium"];
      setHasPremium(!!currentPremiumAccess);

      const offerings = await window.Purchases.getOfferings();
      if (offerings.current && offerings.current.availablePackages.length > 0) {
        console.log(offerings.current.availablePackages);

        const foundPremium = offerings.current.availablePackages.find(
          (p) => p.identifier === "$rc_socio_premium_monthly"
        );

        if (foundPremium) setPremiumPackage(foundPremium);

        if (!foundPremium) {
          setError("Nenhum plano Premium encontrado.");
        }
      } else {
        setError("Nenhuma oferta de assinatura encontrada no RevenueCat.");
      }
    } catch (err: any) {
      console.error("Erro ao buscar planos ou status:", err);
      setError(
        `Erro ao carregar o plano: ${
          err instanceof Error ? err.message : String(err) || "Desconhecido"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsAndCheckAccess();
  }, []);

  return (
    <IonPage>
      <AppHeader
        title="Meu Plano"
        backgroundColor="#868950"
        textColor="#FFFFFF"
      />

      <AvatarWrapper>
        <Avatar
          src={user?.avatar_url || "/assets/default-profile-photo.png"}
          alt="Foto de perfil"
        />
      </AvatarWrapper>

      <IonContent fullscreen style={{ "--background": "#FFFFFF" } as any}>
        <ProfileContainer>
          <UserName>{user?.name}</UserName>
          <UserSubInfo>{user?.email}</UserSubInfo>

          <PlanValue>
            MEU PLANO: {hasPremium ? "PREMIUM" : "GRATUITO"}
          </PlanValue>

          {hasPremium ? (
            <>
              <Title>Seus benefícios</Title>

              <BenefitsContainer>
                <Benefit>Acúmulo de moedas Lupa - ilimitado</Benefit>
                <Benefit>Pontos ilimitados e níveis exclusivos</Benefit>
                <Benefit>Medalhas inéditas</Benefit>
                <Benefit>Troca de moedas Lupa por experiências</Benefit>
              </BenefitsContainer>
            </>
          ) : (
            <>
              <Title>Torne-se um Sócio Premium do Clube Lupa</Title>
              <Paragraph>
                Ao se tornar um Sócio Premium, aproveite as seguintes vantagens:
              </Paragraph>
              <BenefitsContainer>
                <Benefit>
                  Acumule ainda mais moedas sem limite para aproveitar todo o
                  seu progresso.
                </Benefit>
                <Benefit>
                  Desbloqueie níveis exclusivos e continue evoluindo.
                </Benefit>
                <Benefit>
                  Ganhe medalhas inéditas e mostre suas conquistas únicas.
                </Benefit>
                <Benefit>
                  Troque suas moedas por experiências incríveis dentro do app.
                </Benefit>
              </BenefitsContainer>
              <Paragraph>
                Tudo isso por{" "}
                <Price>R$ {premiumPackage?.product.priceString}</Price>
                por mês. Cancele quando quiser.
              </Paragraph>

              {error && <IonText color="danger">{error}</IonText>}

              <ButtonWrapper>
                <PremiumButton onClick={handlePurchase} disabled={isLoading}>
                  TORNAR-SE PREMIUM
                </PremiumButton>
              </ButtonWrapper>
            </>
          )}
        </ProfileContainer>
      </IonContent>
    </IonPage>
  );
};

export default MyPlan;
