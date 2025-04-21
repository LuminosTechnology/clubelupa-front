// src/pages/Notification/Notification.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import AppHeader from '../../components/SimpleHeader';
import Button from '../../components/Button';

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
  Switch,
} from './Notification.style';

import { logout, getUserByToken } from '../../services/auth-service';
import { User } from '../../services/interfaces/Auth';

import avatarPic from '../../assets/profile-pic.svg';

/** Botão “ÚLTIMAS NOTIFICAÇÕES” centralizado */
const LogoutButton = styled(Button)`
  display: block;
  margin: 0 auto;
  background-color: #8E9455 !important;
  color: #ffffff !important;
`;

const Notification: React.FC = () => {
  const history = useHistory();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const fetched = await getUserByToken();
        setUser(fetched);
      } catch (err) {
        console.error('Erro ao buscar dados do usuário', err);
      }
    })();
  }, []);

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
        <Avatar src={avatarPic} alt="Foto de perfil" />
      </AvatarWrapper>

      <IonContent fullscreen style={{ '--background': '#FFFFFF' } as any}>
        <ProfileContainer>
          <UserName>{user?.nome_completo ?? ''}</UserName>
          <UserSubInfo>{user?.cpf ?? ''}</UserSubInfo>
          <UserSubInfo>{user?.email ?? ''}</UserSubInfo>

          {/* Dois toggles com labels */}
          <ToggleWrapper>
            <ToggleOption>
              <Switch>
                <input type="checkbox" />
                <span />
              </Switch>
              <ToggleLabel>Receber e-mais de promoção</ToggleLabel>
            </ToggleOption>
            <ToggleOption>
              <Switch>
                <input type="checkbox" />
                <span />
              </Switch>
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
