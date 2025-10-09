
import { IonCheckbox, IonContent, IonLabel, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import AppHeader from "../../components/SimpleHeader";

import {
  Avatar,
  AvatarWrapper,
  ButtonWrapper,
  Paragraph,
  PlanValue,
  PremiumButton,
  ProfileContainer,
  Title,
  UserName,
  UserSubInfo,
} from "./MyPlan.style";

import { Capacitor } from "@capacitor/core";
import { useAuthContext } from "../../contexts/AuthContext";
import { useRevenueCatPackages } from "../../contexts/RevenueCatContext";
import { SocioPremiumBenefits } from "./components/SocioPremiumBenefits";
import { AffiliateBenefits } from "./components/AffiliateBenefits";
import { BecomeAnAffiliateSection } from "./components/BecomeAnAffiliateSection";
import { PremiumPackageSection } from "./components/PremiumPurchaseSection";

const MyPlan: React.FC = () => {
  const { user, refetchUser } = useAuthContext();

  useEffect(() => {
    refetchUser();
  }, []);

  const getPlanName = () => {
    if (!user?.is_payed) return "GRATUITO";
    if (user?.is_affiliate) return "AFILIADO";
    return "SÓCIO PREMIUM";
  };

  const renderContent = () => {
    if (!user) return;
    const establishment = user.establishments && user.establishments[0];
    const isApprovedAfiliate = establishment && establishment.approved_status === "2";  

    if (user.is_payed) {
      
      if (user.is_affiliate) {
        if (isApprovedAfiliate) {
          return (
            <>
              <AffiliateBenefits />
              <SocioPremiumBenefits />;
            </>
          );
        }
        return <SocioPremiumBenefits />;
      } else {
        return <SocioPremiumBenefits />;
      }

    } else {
      if (user.is_affiliate) {
          if(isApprovedAfiliate){   
            return <BecomeAnAffiliateSection />;
          }else{
              return (
                <>
                <br />
                  <Title>Sua conta de afiliado ainda não foi aprovada</Title>
                  <Paragraph>
                    O processo de análise é feito pelo nosso time e pode levar até
                    72 horas. <br />
                    Assim que sua conta for aprovada, você receberá uma notificação
                    e poderá acessar a área de afiliados normalmente.
                  </Paragraph>
                </>                
              );
          }
          

      } else {
        return <PremiumPackageSection />;
      }
    }
  };

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

          <PlanValue>MEU PLANO: {getPlanName()}</PlanValue>

          {renderContent()}


          {/* {packages.map((pkg) => (
            <>
              <Paragraph>{pkg.identifier}</Paragraph>
              <Paragraph>{pkg.product.title}</Paragraph>
              <ButtonWrapper key={pkg.identifier}>
                <PremiumButton
                  onClick={() => purchase(pkg)}
                  disabled={hasSubscription}
                >
                  {hasSubscription
                    ? "ASSINATURA ATIVA"
                    : `Ativar por ${pkg.product.priceString}`}
                </PremiumButton>
              </ButtonWrapper>
            </>
          ))} */}
        </ProfileContainer>
      </IonContent>
    </IonPage>
  );
};

export default MyPlan;
