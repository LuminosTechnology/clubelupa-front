import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import AppHeader from '../../components/SimpleHeader';
import Button from '../../components/Button';
import styled from 'styled-components';

import {
  AreaContainer,
  ProfileWrapper,
  ProfilePhoto,
  Name,
  SubInfo,
  Option,
  Divider,
} from './AffiliateArea.style';

import { logout } from '../../services/auth-service';
import profilePic from '../../assets/profile-pic.svg';

/** Botão “Sair” centralizado com override de cores */
const LogoutButton = styled(Button)`
  display: block;
  margin: 100px auto 0;
  background-color: #8e9455 !important;
  color: #ffffff !important;
`;

const AffiliateArea: React.FC = () => {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      history.goBack();  // retorna para a tela anterior
    }
  };

  return (
    <IonPage>
      <AppHeader
        title="Área dos Afiliados"
        backgroundColor="#868950"
        textColor="#FFFFFF"
      />

      <ProfileWrapper>
        <ProfilePhoto src={profilePic} alt="Foto de perfil" />
      </ProfileWrapper>

      <IonContent fullscreen style={{ '--background': '#FFFFFF' }}>
        <AreaContainer>
          <Name>Alameda Simple Organic</Name>
          <SubInfo>xxx.xxx.xxx/0001‑xx</SubInfo>
          <SubInfo>alameda@alameda.com.br</SubInfo>

          <Option primary>Editar Perfil</Option>
          <Divider />
          <Option>Publicidade</Option>
          <Divider />
          <Option>Relatórios</Option>
          <Divider />

          <LogoutButton onClick={handleLogout}>
            Sair
          </LogoutButton>
        </AreaContainer>
      </IonContent>
    </IonPage>
  );
};

export default AffiliateArea;
