// src/pages/ProfilePage/ProfilePage.tsx
import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Button from "../../components/Button";
import AppHeader from "../../components/SimpleHeader";

import {
  Avatar,
  AvatarWrapper,
  Divider,
  LogoutWrapper,
  MenuIcon,
  MenuOption,
  ProfileContainer,
  UserName,
  UserSubInfo,
} from "./ProfilePage.style";

import { logout } from "../../services/auth-service";

import chatIcon from "../../assets/chat.svg";
import editIcon from "../../assets/edit.svg";
import emailIcon from "../../assets/email.svg";
import instagramIcon from "../../assets/insta.svg";
import lockIcon from "../../assets/lock.svg";
import notificationIcon from "../../assets/notification.svg";
import { useAuthContext } from "../../contexts/AuthContext";

/** Botão “SAIR” centralizado */
const LogoutButton = styled(Button)`
  display: block;
  margin: 0 auto;
  background-color: #8e9455 !important;
  color: #ffffff !important;
`;

const ProfilePage: React.FC = () => {
  const history = useHistory();
  const { user } = useAuthContext();

  const handleLogout = async () => {
    await logout();
    history.goBack();
  };

  const goToEditProfile = () => {
    history.push("/profile/edit");
  };

  const goToNotification = () => {
    history.push("/profile/notification");
  };

  const goToTalkToUs = () => {
    history.push("/profile/talktous");
  };
  const goToChangePassword = () => {
    history.push("/profile/change-password");
  };

  // Escolhe a foto do usuário se existir, senão o placeholder
  return (
    <IonPage>
      <AppHeader
        title="Meu Perfil"
        backgroundColor="#868950"
        textColor="#FFFFFF"
      />

      <AvatarWrapper>
        <Avatar src={user?.avatar_url || "/assets/default-profile-photo.png"} />
      </AvatarWrapper>

      <IonContent fullscreen style={{ "--background": "#FFFFFF" } as any}>
        <ProfileContainer>
          <UserName>{user?.name}</UserName>
          <UserSubInfo>{user?.email}</UserSubInfo>

          <MenuOption primary onClick={goToEditProfile}>
            <MenuIcon src={editIcon} alt="Ícone Editar Perfil" />
            Editar Perfil
          </MenuOption>
          <Divider />

          <MenuOption onClick={goToChangePassword}>
            <MenuIcon src={lockIcon} alt="Ícone Alterar Senha" />
            Alterar Senha
          </MenuOption>
          <Divider />

          <MenuOption onClick={goToNotification}>
            <MenuIcon src={notificationIcon} alt="Ícone Notificação" />
            Notificação
          </MenuOption>
          <Divider />

          <MenuOption onClick={goToTalkToUs}>
            <MenuIcon src={chatIcon} alt="Ícone Fale Conosco" />
            Fale Conosco
          </MenuOption>
          <Divider style={{ marginBottom: "80px" }} />

          <MenuOption>
            <MenuIcon src={emailIcon} alt="Ícone Email" />
            contato@clubelupa.com.br
          </MenuOption>
          <MenuOption>
            <MenuIcon src={instagramIcon} alt="Ícone Instagram" />
            ClubeLupa
          </MenuOption>

          <LogoutWrapper>
            <LogoutButton onClick={handleLogout}>SAIR</LogoutButton>
          </LogoutWrapper>
        </ProfileContainer>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
