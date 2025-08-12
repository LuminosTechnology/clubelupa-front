// src/pages/TalkToUs/TalkToUs.tsx
import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router-dom";
import AppHeader from "../../components/SimpleHeader";

import {
  ActionButton,
  ActionIcon,
  Avatar,
  AvatarWrapper,
  LogoutWrapper,
  ProfileContainer,
  UserName,
  UserSubInfo,
} from "./TalkToUs.style";

import { logout } from "../../services/auth-service";

import emailIcon from "../../assets/emailwhite.svg";
import whatsIcon from "../../assets/whatswhite.svg";
import { useAuthContext } from "../../contexts/AuthContext";

const TalkToUs: React.FC = () => {
  const history = useHistory();
  const { user } = useAuthContext();

  const handleLogout = async () => {
    await logout();
    history.goBack();
  };

  const handleWhats = () => {
    // abra o WhatsApp (exemplo de link; ajuste conforme necessário)
    window.open("https://wa.me/seunumerodetelefone", "_blank");
  };

  const handleEmail = () => {
    window.location.href = "mailto:contato@clubelupa.com.br";
  };

  return (
    <IonPage>
      <AppHeader
        title="Fale Conosco"
        backgroundColor="#868950"
        textColor="#FFFFFF"
      />

      <AvatarWrapper>
        <Avatar
          src={user?.avatar_url || "/assets/default-photo.png"}
          alt="Foto de perfil"
        />
      </AvatarWrapper>

      <IonContent fullscreen style={{ "--background": "#FFFFFF" } as any}>
        <ProfileContainer>
          <UserName>{user?.name}</UserName>
          <UserSubInfo>{user?.email}</UserSubInfo>

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

export default TalkToUs;
