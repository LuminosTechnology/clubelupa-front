// src/pages/MyPlan/MyPlan.tsx
import React, { useEffect, useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";
import AppHeader from "../../components/SimpleHeader";

import {
  ProfileContainer,
  AvatarWrapper,
  Avatar,
  UserName,
  UserSubInfo,
  InfoText,
  PlanValue,
  ButtonWrapper,
  PremiumButton,
} from "./MyPlan.style";

import { getUserByToken } from "../../services/auth-service";
import { User } from "../../services/interfaces/Auth";

import avatarPic from "../../assets/profile-pic.svg";
import { useAuthContext } from "../../contexts/AuthContext";

const MyPlan: React.FC = () => {
  const history = useHistory();

  const { user } = useAuthContext();

  const handleUpgrade = () => history.push("/myplan/upgrade");

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
          <UserSubInfo>{user?.cpf}</UserSubInfo>
          <UserSubInfo>{user?.email}</UserSubInfo>

          <InfoText>
            Você faz parte do programa
            <br />
            Clube Lupa
          </InfoText>
          <PlanValue>VALOR DO PLANO: FREE</PlanValue>

          <ButtonWrapper>
            <PremiumButton onClick={handleUpgrade}>
              ME TORNAR PREMIUM
              <br />
              POR 19,90/ MÊS
            </PremiumButton>
          </ButtonWrapper>
        </ProfileContainer>
      </IonContent>
    </IonPage>
  );
};

export default MyPlan;
