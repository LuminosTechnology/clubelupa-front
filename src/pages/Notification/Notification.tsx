// src/pages/Notification/Notification.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IonPage, IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";
import AppHeader from "../../components/SimpleHeader";
import Button from "../../components/Button";

import {
  ProfileContainer,
  AvatarWrapper,
  Avatar,
  UserName,
  UserSubInfo,
  Divider,
  LogoutWrapper,
  ToggleWrapper,
  ToggleOption,
  ToggleLabel,
  ToggleSwitch,
} from "./Notification.style";

import { logout, getUserByToken } from "../../services/auth-service";

import avatarPic from "../../assets/profile-pic.svg";
import { useAuthContext } from "../../contexts/AuthContext";

/** Botão “ÚLTIMAS NOTIFICAÇÕES” centralizado */
const LogoutButton = styled(Button)`
  display: block;
  margin: 0 auto;
  background-color: #8e9455 !important;
  color: #ffffff !important;
`;

const Notification: React.FC = () => {
  const history = useHistory();
  const { user } = useAuthContext();

  const handleLogout = async () => {
    await logout();
    history.goBack();
  };

  return (
    <IonPage>
      <AppHeader
        title="Notificações"
        backgroundColor="#868950"
        textColor="#FFFFFF"
      />

      <AvatarWrapper>
        <Avatar src={user?.avatar_url || "/assets/default-photo.png"} />
      </AvatarWrapper>

      <IonContent fullscreen style={{ "--background": "#FFFFFF" } as any}>
        <ProfileContainer>
          <UserName>{user?.name ?? ""}</UserName>
          <UserSubInfo>{user?.email ?? ""}</UserSubInfo>

          {/* Dois toggles com labels */}
          <ToggleWrapper>
            <ToggleOption>
              <ToggleSwitch>
                <input type="checkbox" />
                <span />
              </ToggleSwitch>
              <ToggleLabel>Receber e‑mails de promoção</ToggleLabel>
            </ToggleOption>
            <ToggleOption>
              <ToggleSwitch>
                <input type="checkbox" />
                <span />
              </ToggleSwitch>
              <ToggleLabel>Notificações</ToggleLabel>
            </ToggleOption>
          </ToggleWrapper>

          <LogoutWrapper>
            <LogoutButton onClick={handleLogout}>
              ÚLTIMAS NOTIFICAÇÕES
            </LogoutButton>
          </LogoutWrapper>
        </ProfileContainer>
      </IonContent>
    </IonPage>
  );
};

export default Notification;
