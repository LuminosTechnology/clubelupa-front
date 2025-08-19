/* ──────────────────────────────────────────────────────────────
 * src/pages/AffiliateArea/index.tsx
 * Área privada do Afiliado – busca automaticamente o primeiro
 * afiliado vinculado ao token (não precisa de :id na rota)
 * ────────────────────────────────────────────────────────────── */
import { IonContent, IonPage, IonSpinner } from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Button from "../../components/Button";
import AppHeader from "../../components/SimpleHeader";
import {
  AreaContainer,
  Divider,
  LogoutContainer,
  Name,
  Option,
  OptionIcon,
  ProfilePhoto,
  ProfileWrapper,
  SubInfo,
  WarningButton,
  WarningText,
  WarningTitle,
} from "./AffiliateArea.style";

import { logout } from "../../services/auth-service";

import editIcon from "../../assets/edit.svg";
import emailIcon from "../../assets/email.svg";
import instagramIcon from "../../assets/insta.svg";
import {
  default as publicidadeIcon,
  default as relatoriosIcon,
} from "../../assets/relatorios.svg";
import { useAuthContext } from "../../contexts/AuthContext";

/* ─── Botão “Sair” centralizado ───────────────────────────────── */
const LogoutButton = styled(Button)`
  display: block;
  margin: 0 auto;
  background-color: #8e9455 !important;
  color: #ffffff !important;
`;

const AffiliateArea: React.FC = () => {
  const history = useHistory();
  const { user } = useAuthContext();

  /* ─── ações ──────────────────────────────────────────────────── */
  const handleLogout = async () => {
    await logout();
    history.goBack();
  };

  const goToEdit = () => {
    history.push("/affiliate/area/edit");
  };

  const goToAdvertising = () => {
    history.push("/affiliate/advertising");
  };

  const establishment = user?.establishments?.[0] || null;
  const displayName = establishment?.name;
  const profilePhoto = user?.avatar_url;

  if (!establishment) return null;

  return (
    <IonPage>
      <AppHeader
        title="Área dos Afiliados"
        backgroundColor="#868950"
        textColor="#FFFFFF"
      />

      <ProfileWrapper>
        <ProfilePhoto
          src={profilePhoto || "/assets/default-profile-photo.png"}
          alt="Foto de perfil"
        />
      </ProfileWrapper>

      <IonContent fullscreen style={{ "--background": "#FFFFFF" } as any}>
        <AreaContainer>
          <Name>{displayName}</Name>
          <SubInfo>{establishment?.email}</SubInfo>
          {!user?.is_payed && (
            <>
              <WarningTitle>ATENÇÃO!</WarningTitle>
              <WarningText>
                Ainda não detectamos sua assinatura. Sua marca não será exibida
                no mapa.
              </WarningText>
              <WarningButton onClick={() => history.push("/affiliate/paywall")}>
                Assinar agora
              </WarningButton>
            </>
          )}

          <Option primary onClick={goToEdit}>
            <OptionIcon src={editIcon} alt="Ícone Editar Perfil" />
            Editar marca
          </Option>
          <Divider />

          <Option onClick={goToAdvertising}>
            <OptionIcon src={publicidadeIcon} alt="Ícone Publicidade" />
            Publicidade
          </Option>
          <Divider />

          <Option>
            <OptionIcon src={relatoriosIcon} alt="Ícone Relatórios" />
            Relatórios
          </Option>
          <Divider style={{ marginBottom: "80px" }} />

          {establishment?.social_links?.site && (
            <Option>
              <OptionIcon src={emailIcon} alt="Ícone Email" />
              {establishment?.social_links?.site}
            </Option>
          )}

          {establishment?.social_links?.instagram && (
            <Option>
              <OptionIcon src={instagramIcon} alt="Ícone Instagram" />
              {establishment?.social_links?.instagram}
            </Option>
          )}

          <LogoutContainer>
            <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
          </LogoutContainer>
        </AreaContainer>
      </IonContent>
    </IonPage>
  );
};

export default AffiliateArea;
