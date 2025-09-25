// src/pages/MyPlan/MyPlan.tsx
import { IonContent, IonPage, IonText } from "@ionic/react";
import React, { useEffect, useState } from "react";
import AppHeader from "../../components/SimpleHeader";

import {
  Benefit,
  BenefitsContainer,
  ButtonWrapper,
  Paragraph,
  PremiumButton,
  Price,
  ProfileContainer,
  Title,
} from "./AffiliatePaywall.style";

import { Capacitor } from "@capacitor/core";
import { PurchasesPackage } from "@revenuecat/purchases-capacitor";
import { useAuthContext } from "../../contexts/AuthContext";

const AffiliatePaywall: React.FC = () => {
  const [affiliatePackage, setAffiliatePackage] = useState<PurchasesPackage>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasAffiliate, setHasAffiliate] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { refetchUser, user } = useAuthContext();

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
      refetchUser();
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
    setIsLoading(false);
    setError(null);

    if (!Capacitor.isNativePlatform() || !window.Purchases) {
      setError("Funcionalidade de assinatura não disponível no dispositivo");
      setIsLoading(true);
      return;
    }

      const approvedStatus = user && user.establishments ? +user.establishments[0].approved_status : 1;

      if(approvedStatus != 2) {
        setError("A assinatura será liberada após aprovação como afiliado");
        setIsLoading(true)
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
        title="Ativar Assinatura"
        backgroundColor="#868950"
        textColor="#FFFFFF"
      />

      <IonContent fullscreen style={{ "--background": "#FFFFFF" } as any}>
        <ProfileContainer>
          <Title>Ative sua assinatura de Afiliado do Clube Lupa</Title>
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
              usuários
            </Benefit>
            <Benefit>
              Check-in de clientes no seu estabelecimento, com registro
              automático
            </Benefit>
            <Benefit>
              Escaneamento de notas fiscais de produtos comprados pelos seus
              clientes
            </Benefit>
            <Benefit>
              Destaque da sua marca no mapa e no Instagram oficial do Clube.
            </Benefit>
            <Benefit>Acesso as inscrições do Quintal do Lupa</Benefit>
            <Benefit>Acesso à loja de serviços do Lupa</Benefit>
            <Benefit>
              Conteúdos mensais exclusivos com profissionais convidados
            </Benefit>
          </BenefitsContainer>
          <Paragraph>
            Tudo isso por <Price>{affiliatePackage?.product.priceString}</Price>{" "}
            por mês. Cancele quando quiser.
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

export default AffiliatePaywall;
