// src/pages/RecommendAndWin/RecommendAndWin.tsx
import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router-dom";
import AppHeader from "../../components/SimpleHeader";

import {
  ActionButton,
  ActionIcon,
  Avatar,
  AvatarWrapper,
  InviteText,
  LogoutWrapper,
  ProfileContainer,
  UserName,
  UserSubInfo,
} from "./RecommendAndWin.style";

import { logout } from "../../services/auth-service";

import emailIcon from "../../assets/emailwhite.svg";
import whatsIcon from "../../assets/whatswhite.svg";
import { useAuthContext } from "../../contexts/AuthContext";

const RecommendAndWin: React.FC = () => {
  const history = useHistory();
  const { user } = useAuthContext();

  const handleLogout = async () => {
    await logout();
    history.goBack();
  };

  const handleWhats = () => {
    window.open("https://wa.me/seunumerodetelefone", "_blank");
  };

  const handleEmail = () => {
    window.location.href = "mailto:contato@clubelupa.com.br";
  };

  return (
    <IonPage>
      <AppHeader
        title="Indique e Ganhe"
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
          <UserName>{user?.nome_completo ?? ""}</UserName>
          <UserSubInfo>{user?.cpf ?? ""}</UserSubInfo>
          <UserSubInfo>{user?.email ?? ""}</UserSubInfo>

          {/* Texto abaixo do email */}
          <InviteText>Enviar convite pelo</InviteText>

          <LogoutWrapper>
            <ActionButton onClick={handleWhats}>
              <ActionIcon src={whatsIcon} alt="WhatsApp" />
              WHATSAPP
            </ActionButton>
            <ActionButton onClick={handleEmail}>
              <ActionIcon src={emailIcon} alt="Email" />
              EMAIL
            </ActionButton>
          </LogoutWrapper>
        </ProfileContainer>
      </IonContent>
    </IonPage>
  );
};

export default RecommendAndWin;
