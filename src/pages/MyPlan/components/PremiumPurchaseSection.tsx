import { IonText } from "@ionic/react";
import { PurchasesPackage } from "@revenuecat/purchases-capacitor";
import React from "react";
import {
  Title,
  Paragraph,
  BenefitsContainer,
  Benefit,
  Price,
  ButtonWrapper,
  PremiumButton,
} from "../MyPlan.style";
import { useRevenueCatPackages } from "../../../contexts/RevenueCatContext";

export const PremiumPackageSection: React.FC = ({}) => {
  const { packages, purchase, error, isLoading } = useRevenueCatPackages();

  const premiumPackage = packages.find(
    (pkg) => pkg.identifier === "$rc_socio_premium_monthly"
  );

  const handlePurchase = async () => {
    if (!premiumPackage) return;
    await purchase(premiumPackage);
  };

  return (
    <>
      <Title>Torne-se um Sócio do Clube Lupa</Title>
      <Paragraph>
        Ser sócio é viver o Lupa em sua forma mais completa: trocar moedas por
        experiências exclusivas dentro do app e aproveitar a cidade de um jeito
        único!
        <br />
        <br />
        Além disso, como Sócio você também:
      </Paragraph>
      <BenefitsContainer>
        <Benefit>Acumula moedas sem limite</Benefit>
        <Benefit>Desbloqueia níveis exclusivos</Benefit>
        <Benefit>Ganha medalhas inéditas para marcar sua jornada</Benefit>
      </BenefitsContainer>
      <Paragraph>
        Ser Sócio é entrar de vez na nossa curadoria: viver a cidade de um jeito
        especial, com acesso a descobertas que você não encontra em nenhum outro
        lugar.
      </Paragraph>
      <Paragraph>
        Tudo isso por <Price>{premiumPackage?.product.priceString}</Price> por
        mês. Cancele quando quiser.
      </Paragraph>

      {error && <IonText color="danger">{error}</IonText>}

      <ButtonWrapper>
        <PremiumButton onClick={handlePurchase} disabled={isLoading}>
          TORNAR-SE SÓCIO
        </PremiumButton>
      </ButtonWrapper>
    </>
  );
};
