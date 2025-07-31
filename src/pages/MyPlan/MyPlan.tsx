// src/pages/MyPlan/MyPlan.tsx
import { IonContent, IonPage, IonText } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AppHeader from "../../components/SimpleHeader";

import {
  Avatar,
  AvatarWrapper,
  ButtonWrapper,
  InfoText,
  PlanValue,
  PremiumButton,
  ProfileContainer,
  UserName,
  UserSubInfo,
} from "./MyPlan.style";

import { useAuthContext } from "../../contexts/AuthContext";
import { Capacitor } from "@capacitor/core";
import { Purchases } from "@revenuecat/purchases-capacitor";

const MyPlan: React.FC = () => {
  const navigate = useHistory();
  const [premiumPackage, setPremiumPackage] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasPremium, setHasPremium] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuthContext();

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
          src={user?.profile_photo || "/assets/default-profile-photo.png"}
          alt="Foto de perfil"
        />
      </AvatarWrapper>

      <IonContent fullscreen style={{ "--background": "#FFFFFF" } as any}>
        <ProfileContainer>
          <UserName>{user?.nome_completo}</UserName>
          <UserSubInfo>{user?.email}</UserSubInfo>

          <InfoText>
            Você faz parte do programa
            <br />
            Clube Lupa
          </InfoText>
          <PlanValue>
            MEU PLANO: {hasPremium ? "PREMIUM" : "GRATUITO"}
          </PlanValue>

          {error && <IonText color="danger">{error}</IonText>}

          {!hasPremium && (
            <ButtonWrapper>
              <PremiumButton onClick={handlePurchase} disabled={isLoading}>
                {isLoading ? "PROCESSANDO" : "ME TORNAR PREMIUM"}
                ME TORNAR PREMIUM
                <br />
                POR{" "}
                {premiumPackage
                  ? `${premiumPackage.product.priceString}/MÊS`
                  : "..."}
              </PremiumButton>
            </ButtonWrapper>
          )}
        </ProfileContainer>
      </IonContent>
    </IonPage>
  );
};

export default MyPlan;
