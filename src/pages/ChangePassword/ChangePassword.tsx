// src/pages/ProfilePage/ProfilePage.tsx
import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import AppHeader from "../../components/SimpleHeader";

import {
  Avatar,
  AvatarWrapper,
  Button,
  Input,
  ProfileContainer,
  Title,
} from "./ChangePassword.style";

import { useAuthContext } from "../../contexts/AuthContext";
import FloatingInput from "../../components/FloatingInput";

const ProfileChangePasswordPage: React.FC = () => {
  const { user } = useAuthContext();
  return (
    <IonPage>
      <AppHeader
        title="Alterar Senha"
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
          <Title>Alterar Senha</Title>
          <Input type="password" placeholder="Nova senha" />
          <Input type="password" placeholder="Confirmar senha" />
          <Button>ALTERAR SENHA</Button>
        </ProfileContainer>
      </IonContent>
    </IonPage>
  );
};

export default ProfileChangePasswordPage;
