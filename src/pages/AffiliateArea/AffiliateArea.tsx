/* ──────────────────────────────────────────────────────────────
 * src/pages/AffiliateArea/index.tsx
 * Área privada do Afiliado – busca automaticamente o primeiro
 * afiliado vinculado ao token (não precisa de :id na rota)
 * ────────────────────────────────────────────────────────────── */
import React, { useEffect, useState } from "react";
import { IonPage, IonContent, IonSpinner } from "@ionic/react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import AppHeader from "../../components/SimpleHeader";
import Button from "../../components/Button";
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
} from "./AffiliateArea.style";

import {
  getMyFirstAffiliate,          
} from "../../services/affiliateService";
import { logout } from "../../services/auth-service";

import editIcon from "../../assets/edit.svg";
import publicidadeIcon from "../../assets/publicidade.svg";
import relatoriosIcon from "../../assets/relatorios.svg";
import emailIcon from "../../assets/email.svg";
import instagramIcon from "../../assets/insta.svg";

/* ─── Botão “Sair” centralizado ───────────────────────────────── */
const LogoutButton = styled(Button)`
  display: block;
  margin: 0 auto;
  background-color: #8e9455 !important;
  color: #ffffff !important;
`;

const AffiliateArea: React.FC = () => {
  const history = useHistory();
  const [affiliate, setAffiliate] = useState<any>(null);

  /* ─── carrega o primeiro afiliado do token ───────────────────── */
  useEffect(() => {
    (async () => {
      try {
        const data = await getMyFirstAffiliate();
        setAffiliate(data);
      } catch (e) {
        console.error("[AffiliateArea] Erro ao carregar afiliado:", e);
      }
    })();
  }, []);

  /* ─── ações ──────────────────────────────────────────────────── */
  const handleLogout = async () => {
    await logout();
    history.goBack();
  };

  const goToEdit = () => {
    if (affiliate?.id) {
      history.push("/affiliate/area/edit");
    }
  };

  /* ─── loading state ──────────────────────────────────────────── */
  if (!affiliate) {
    return (
      <IonPage>
        <AppHeader
          title="Área dos Afiliados"
          backgroundColor="#868950"
          textColor="#FFF"
        />
        <IonContent className="ion-padding" fullscreen>
          <IonSpinner name="crescent" />
        </IonContent>
      </IonPage>
    );
  }

  /* ─── helpers ────────────────────────────────────────────────── */
  const displayName = affiliate.nome_local || affiliate.nome_fantasia;
  const profilePhoto =
    affiliate.foto_perfil || affiliate.profile_photo || "/assets/profile-pic.svg";

  /* ─── UI ─────────────────────────────────────────────────────── */
  return (
    <IonPage>
      <AppHeader
        title="Área dos Afiliados"
        backgroundColor="#868950"
        textColor="#FFFFFF"
      />

      <ProfileWrapper>
        <ProfilePhoto src={profilePhoto} alt="Foto de perfil" />
      </ProfileWrapper>

      <IonContent fullscreen style={{ "--background": "#FFFFFF" } as any}>
        <AreaContainer>
          <Name>{displayName}</Name>
          {!!affiliate.cnpj && <SubInfo>{affiliate.cnpj}</SubInfo>}
          {!!affiliate.email && <SubInfo>{affiliate.email}</SubInfo>}

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
          <Divider style={{ marginBottom: "80px" }} />

          {!!affiliate.email && (
            <Option>
              <OptionIcon src={emailIcon} alt="Ícone Email" />
              {affiliate.email}
            </Option>
          )}
          {!!affiliate.instagram && (
            <Option>
              <OptionIcon src={instagramIcon} alt="Ícone Instagram" />
              {affiliate.instagram}
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
