// src/pages/ProfilePage/ProfilePage.tsx
import React, { useEffect, useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";
import AppHeader from "../../components/SimpleHeader";
import Button from "../../components/Button";
import styled from "styled-components";

import {
  ProfileContainer,
  AvatarWrapper,
  Avatar,
  UserName,
  UserSubInfo,
  MenuOption,
  MenuIcon,
  Divider,
  LogoutWrapper,
} from "./ProfilePage.style";

import { logout, getUserByToken } from "../../services/auth-service";
import { User } from "../../services/interfaces/Auth";

import editIcon from "../../assets/edit.svg";
import lockIcon from "../../assets/lock.svg";
import notificationIcon from "../../assets/notification.svg";
import chatIcon from "../../assets/chat.svg";
import emailIcon from "../../assets/email.svg";
import instagramIcon from "../../assets/insta.svg";

/** Botão “SAIR” centralizado */
const LogoutButton = styled(Button)`
  display: block;
  margin: 0 auto;
  background-color: #8e9455 !important;
  color: #ffffff !important;
`;

const ProfilePage: React.FC = () => {
  const history = useHistory();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const fetched = await getUserByToken();
        setUser(fetched);
      } catch (err) {
        console.error("Erro ao buscar dados do usuário", err);
      }
    })();
  }, []);

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

  // Escolhe a foto do usuário se existir, senão o placeholder
  return (
    <IonPage>
      <AppHeader
        title="Meu Perfil"
        backgroundColor="#868950"
        textColor="#FFFFFF"
      />

      <AvatarWrapper>
        <Avatar
          src={
            user?.avatar_url ||
            user?.profile_photo ||
            "/assets/default-profile-photo.png"
          }
        />
      </AvatarWrapper>

      <IonContent fullscreen style={{ "--background": "#FFFFFF" } as any}>
        <ProfileContainer>
          <UserName>{user?.nome_completo ?? ""}</UserName>
          <UserSubInfo>{user?.cpf ?? ""}</UserSubInfo>
          <UserSubInfo>{user?.email ?? ""}</UserSubInfo>

          <MenuOption primary onClick={goToEditProfile}>
            <MenuIcon src={editIcon} alt="Ícone Editar Perfil" />
            Editar Perfil
          </MenuOption>
          <Divider />

          <MenuOption>
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
