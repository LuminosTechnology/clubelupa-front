// src/pages/ProfilePage/ProfilePage.tsx
import {
  IonButton,
  IonContent,
  IonModal,
  IonPage,
  IonTitle,
  IonToast,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Button from "../../components/Button";
import AppHeader from "../../components/SimpleHeader";

import {
  Avatar,
  AvatarWrapper,
  DeleteAccountColumn,
  DeleteAccountModalContent,
  DeleteAccountModalHeader,
  DeleteAccountModalToolbar,
  DeleteAccountOption,
  DeleteButton,
  Divider,
  LogoutWrapper,
  MenuIcon,
  MenuOption,
  PasswordInput,
  ProfileContainer,
  UserName,
  UserSubInfo,
} from "./ProfilePage.style";

import { deleteAccount } from "../../services/auth-service";

import { Preferences } from "@capacitor/preferences";
import { AxiosError } from "axios";
import chatIcon from "../../assets/chat.svg";
import editIcon from "../../assets/edit.svg";
import emailIcon from "../../assets/email.svg";
import instagramIcon from "../../assets/insta.svg";
import lockIcon from "../../assets/lock.svg";
import notificationIcon from "../../assets/notification.svg";
import { useAuthContext } from "../../contexts/AuthContext";
import { CONTACT, LOCAL_STORAGE_KEYS } from "../../config/constants";
import { Browser } from "@capacitor/browser";

/** Botão “SAIR” centralizado */
const LogoutButton = styled(Button)`
  margin: 0 auto;
  background-color: #8e9455 !important;
  color: #ffffff !important;
`;

const DeleteAccountButton = styled.button`
  background-color: var(--ion-color-danger);
  color: #ffffff;
  border-radius: 999px;
  padding: 1rem 2rem;
  margin: 0;
`;

const ProfilePage: React.FC = () => {
  const history = useHistory();
  const { user, setIsAuthenticated, setUser, logout } = useAuthContext();
  const [passwordInput, setPasswordInput] = useState("");
  const [isOpenDeleteAccountModal, setIsOpenDeleteAccountModal] =
    useState(false);

  const [deleteAccountError, setDeleteAccountError] = useState<
    string | undefined
  >(undefined);

  const handleLogout = async () => {
    history.replace("/login");
    await logout();
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

  const handleDeleteAccount = async () => {
    if (!passwordInput) return;
    try {
      await deleteAccount({ password: passwordInput });
      await Preferences.remove({ key: LOCAL_STORAGE_KEYS.AUTH_TOKEN });
      history.replace("/login");
      setUser(undefined);
      setIsAuthenticated(false);
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 422) {
          setDeleteAccountError(e.response?.data.errors.password[0]);
        } else {
          setDeleteAccountError("Erro ao excluir a conta");
          console.error(e);
        }
      }
    }
  };

  const handleClickEmail = async () => {
    await Browser.open({
      url: `mailto:${CONTACT.EMAIL}`,
    });
  };

  const handleClickInstagram = async () => {
    await Browser.open({
      url: `https://instagram.com/${CONTACT.INSTAGRAM}`,
    });
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
          <Divider />
          <MenuOption>
            <DeleteAccountButton
              onClick={() => setIsOpenDeleteAccountModal(true)}
            >
              Excluir minha conta
            </DeleteAccountButton>
          </MenuOption>
          <Divider />

          <MenuOption onAbort={handleClickEmail}>
            <MenuIcon src={emailIcon} alt="Ícone Email" />
            contato@clubelupa.com.br
          </MenuOption>
          <MenuOption onClick={handleClickInstagram}>
            <MenuIcon src={instagramIcon} alt="Ícone Instagram" />
            ClubeLupa
          </MenuOption>

          <LogoutWrapper>
            <LogoutButton onClick={handleLogout}>DESCONECTAR</LogoutButton>
          </LogoutWrapper>
        </ProfileContainer>

        <IonModal isOpen={isOpenDeleteAccountModal}>
          <DeleteAccountModalContent>
            <DeleteAccountModalHeader>
              <DeleteAccountModalToolbar>
                <IonTitle>Excluir minha conta</IonTitle>
                <IonButton
                  slot="end"
                  color={""}
                  onClick={() => setIsOpenDeleteAccountModal(false)}
                >
                  Cancelar
                </IonButton>
              </DeleteAccountModalToolbar>
            </DeleteAccountModalHeader>
            <DeleteAccountColumn>
              <h1>Exclusão de conta</h1>
              <p>Tem a certeza que quer dizer adeus?</p>
              <p>
                Esta é uma decisão importante! Se confirmar, a sua conta e todos
                os dados associados serão permanentemente apagados. Isto inclui:
              </p>

              <ul>
                <li>👤 O seu perfil e informações pessoais.</li>
                <li>🏅 As suas medalhas e o seu histórico de check-ins.</li>
                <li>💰 O seu saldo de pontos e moedas.</li>
              </ul>

              <p>
                Esta ação não pode ser desfeita. Se estiver certo disto, clique
                no botão abaixo para confirmar.
              </p>
              <PasswordInput
                type="password"
                placeholder="Digite sua senha para confirmar"
                onChange={(e) => setPasswordInput(e.target.value)}
                value={passwordInput}
              />
              <DeleteButton onClick={handleDeleteAccount}>
                Apagar minha conta
              </DeleteButton>
              <IonToast
                isOpen={!!deleteAccountError}
                message={deleteAccountError}
                color="danger"
                duration={4000}
                onDidDismiss={() => setDeleteAccountError(undefined)}
              />
            </DeleteAccountColumn>
          </DeleteAccountModalContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
