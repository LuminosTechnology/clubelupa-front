// src/pages/MyPlan/MyPlan.tsx
import { IonContent, IonPage, IonText } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AppHeader from "../../components/SimpleHeader";

import {
  Avatar,
  AvatarWrapper,
  Benefit,
  BenefitsContainer,
  ButtonWrapper,
  InfoText,
  Paragraph,
  PremiumButton,
  Price,
  ProfileContainer,
  Title,
  UserName,
  UserSubInfo,
} from "./BecomeAnAffiliate.style";

import { Capacitor } from "@capacitor/core";
import { useAuthContext } from "../../contexts/AuthContext";

const BecomeAnAffiliatePage: React.FC = () => {
  const [affiliatePackage, setAffiliatePackage] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasAffiliate, setHasAffiliate] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = async () => {
    if (!affiliatePackage) return;

    setIsLoading(true);
    setError(null);

    try {
      if (!window.Purchases) return;
      const { customerInfo } = await window.Purchases.purchasePackage({
        aPackage: affiliatePackage,
      });
      alert("Parabéns! Você tem o Afiliado do Clube Lupa ativo!");
    } catch (error: any) {
      if (error.code === "PURCHASE_CANCELLED") {
      } else {
        if (error.code === "BILLING_UNAVAILABLE") {
          setError(
            "O serviço de compra não está disponível no seu dispositivo."
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
      const currentAffiliateAccess =
        customerInfo.entitlements.active["afiliado_lupa"];
      setHasAffiliate(!!currentAffiliateAccess);

      const offerings = await window.Purchases.getOfferings();
      if (offerings.current && offerings.current.availablePackages.length > 0) {
        console.log(offerings.current.availablePackages);
        const foundAffiliateOffering = offerings.current.availablePackages.find(
          (p) => p.identifier === "$rc_afiliado_monthly"
        );

        if (foundAffiliateOffering) setAffiliatePackage(foundAffiliateOffering);

        if (!foundAffiliateOffering) {
          setError("Nenhum plano encontrado.");
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
        title="Torne-se um Afiliado"
        backgroundColor="#868950"
        textColor="#FFFFFF"
      />

      <IonContent fullscreen style={{ "--background": "#FFFFFF" } as any}>
        <ProfileContainer>
          <Title>Torne-se um Afiliado do Clube Lupa</Title>
          <Paragraph>
            Com a assinatura Afiliado do Clube Lupa, você impulsiona sua marca e
            se conecta diretamente com nossos membros.
            <br />
            <br />
            Ao assinar, você terá acesso a:
          </Paragraph>
          <BenefitsContainer>
            <Benefit>
              Exibição da sua marca dentro do app, visível para todos os
              usuários;
            </Benefit>
            <Benefit>
              Check-in de clientes no seu estabelecimento, com registro
              automático;
            </Benefit>
            <Benefit>
              Escaneamento de notas fiscais de produtos comprados pelos seus
              clientes;
            </Benefit>
            <Benefit>
              Destaque da sua marca no mapa e no Instagram oficial do Clube.
            </Benefit>
          </BenefitsContainer>
          <Paragraph>
            Tudo isso por <Price>R$ 10,00</Price> por mês. Cancele quando
            quiser.
          </Paragraph>

          {error && <IonText color="danger">{error}</IonText>}

          {!hasAffiliate && (
            <ButtonWrapper>
              <PremiumButton onClick={handlePurchase} disabled={isLoading}>
                {isLoading ? "PROCESSANDO" : "ATIVAR ASSINATURA"}
              </PremiumButton>
            </ButtonWrapper>
          )}
        </ProfileContainer>
      </IonContent>
    </IonPage>
  );
};

export default BecomeAnAffiliatePage;
