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
  OptionIcon,
  Divider,
  LogoutContainer,
} from './AffiliateArea.style';

import { logout } from '../../services/auth-service';
import profilePic from '../../assets/profile-pic.svg';
import editIcon from '../../assets/edit.svg';
import publicidadeIcon from '../../assets/publicidade.svg';
import relatoriosIcon from '../../assets/relatorios.svg';
import emailIcon from '../../assets/email.svg';
import instagramIcon from '../../assets/insta.svg';

/** Botão “Sair” centralizado */
const LogoutButton = styled(Button)`
  display: block;
  margin: 0 auto;
  background-color: #8E9455 !important;
  color: #ffffff !important;
`;

const AffiliateArea: React.FC = () => {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      history.goBack();
    }
  };

  const goToEdit = () => {
    history.push('/affiliate-area-edit');
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

          <Option primary onClick={goToEdit}>
            <OptionIcon src={editIcon} alt="Ícone Editar Perfil" />
            Editar Perfil
          </Option>
          <Divider />

          <Option>
            <OptionIcon src={publicidadeIcon} alt="Ícone Publicidade" />
            Publicidade
          </Option>
          <Divider />

          <Option>
            <OptionIcon src={relatoriosIcon} alt="Ícone Relatórios" />
            Relatórios
          </Option>
          {/* 80px de espaço abaixo dessas três opções */}
          <Divider style={{ marginBottom: '80px' }} />

          {/* Email e Instagram */}
          <Option>
            <OptionIcon src={emailIcon} alt="Ícone Email" />
            contato@clubelupa.com.br
          </Option>
          <Option>
            <OptionIcon src={instagramIcon} alt="Ícone Instagram" />
            ClubeLupa
          </Option>

          <LogoutContainer>
            <LogoutButton onClick={handleLogout}>
              Sair
            </LogoutButton>
          </LogoutContainer>
        </AreaContainer>
      </IonContent>
    </IonPage>
  );
};

export default AffiliateArea;
