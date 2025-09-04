import { IonText } from "@ionic/react";
import { error } from "console";
import {
  Title,
  Paragraph,
  BenefitsContainer,
  Benefit,
  Price,
  ButtonWrapper,
  PremiumButton,
} from "../MyPlan.style";
import React from "react";
import { PurchasesPackage } from "@revenuecat/purchases-capacitor";
import { useRevenueCatPackages } from "../../../contexts/RevenueCatContext";

export const BecomeAnAffiliateSection: React.FC = ({}) => {
  const { packages, purchase, error, isLoading } = useRevenueCatPackages();
  const affiliatePackage = packages.find(
    (pkg) => pkg.identifier === "$rc_afiliado_monthly"
  );

  const handlePurchase = async () => {
    if (!affiliatePackage) return;
    await purchase(affiliatePackage);
  };

  return (
    <>
      <Title>Ative sua assinatura de Afiliado do Clube Lupa</Title>
      <Paragraph>
        Ao se tornar afiliado, sua marca passa a fazer parte da nossa curadoria
        e se conecta diretamente com um público qualificado, curioso e em busca
        de experiências reais.
        <br />
        <br />
        Você terá acesso a:
      </Paragraph>
      <BenefitsContainer>
        <Benefit>
          Exibição da sua marca dentro do app, visível para todos os usuários
        </Benefit>
        <Benefit>
          Check-in de clientes no seu estabelecimento, com registro automático
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
        Tudo isso por <Price>{affiliatePackage?.product.priceString}</Price> por
        mês. Cancele quando quiser.
      </Paragraph>

      {error && <IonText color="danger">{error}</IonText>}

      <ButtonWrapper>
        <PremiumButton onClick={handlePurchase} disabled={isLoading}>
          {isLoading ? "PROCESSANDO" : "ATIVAR ASSINATURA"}
        </PremiumButton>
      </ButtonWrapper>
    </>
  );
};
