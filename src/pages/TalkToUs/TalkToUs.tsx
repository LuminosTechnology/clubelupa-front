// src/pages/TalkToUs/TalkToUs.tsx
import React, { useEffect, useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import AppHeader from '../../components/SimpleHeader';

import {
  ProfileContainer,
  AvatarWrapper,
  Avatar,
  UserName,
  UserSubInfo,
  LogoutWrapper,
  ActionButton,
  ActionIcon,
} from './TalkToUs.style';

import { logout, getUserByToken } from '../../services/auth-service';
import { User } from '../../services/interfaces/Auth';

import avatarPic from '../../assets/profile-pic.svg';
import emailIcon from '../../assets/emailwhite.svg';
import whatsIcon from '../../assets/whatswhite.svg';

const TalkToUs: React.FC = () => {
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

  const handleWhats = () => {
    // abra o WhatsApp (exemplo de link; ajuste conforme necessário)
    window.open('https://wa.me/seunumerodetelefone', '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:contato@clubelupa.com.br';
  };

  return (
    <IonPage>
      <AppHeader
        title="Fale Conosco"
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
