/* ──────────────────────────────────────────────────────────────
 * src/pages/AffiliateArea/index.tsx
 * Área privada do Afiliado – busca automaticamente o primeiro
 * afiliado vinculado ao token (não precisa de :id na rota)
 * ────────────────────────────────────────────────────────────── */
import { IonAlert, IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
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
  Paragraph,
  ProfilePhoto,
  ProfileWrapper,
  StyledAlert,
  SubInfo,
  Title,
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
import { useSubscriptionAlert } from "../../hooks/useSubscriptionAlert";

/* ─── Botão "Sair" centralizado ───────────────────────────────── */
const LogoutButton = styled(Button)`
  display: block;
  margin: 0 auto;
  background-color: #8e9455 !important;
  color: #ffffff !important;
`;

const AffiliateArea: React.FC = () => {
  const history = useHistory();
  const { user } = useAuthContext();
  const { 
    displayPaymentWarning, 
    alertMessage, 
    checkAndShowAlert,
    closeAlert
  } = useSubscriptionAlert();
  const [isApproved, setIsApproved] = useState(false);

  /* ─── ações ──────────────────────────────────────────────────── */
  const handleLogout = async () => {
    await logout();
    history.replace("/login");
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

  useEffect(() => {
    const fetchEstablishment = () => {
      if (!establishment) return;
      if (establishment.approved_status === "2") {
        setIsApproved(true);
      } else {
        setIsApproved(false);
      }
    };

    fetchEstablishment();
  }, [user, establishment]);

  // Verificar se deve bloquear acesso e mostrar alerta
  useEffect(() => {
    if (user?.is_affiliate && !user.is_payed && establishment?.approved_status === "2") {
      // Bloquear acesso e mostrar alerta (forçar exibição)
      checkAndShowAlert(true);
    }
  }, [user, establishment, checkAndShowAlert]);

  return (
    <IonPage>
      <StyledAlert
        isOpen={displayPaymentWarning}
        title={`Seja bem-vindo(a) ao Lupa!`}
        message={
          `Seu espaço está quase garantido!\n\n` +
          `Para oficializar e concluir o cadastro, oficialize a sua assinatura como afiliado Lupa!\n\n` +
          `(${alertMessage})`
        }
        buttons={[
          {
            text: "DEIXAR PARA DEPOIS",
            role: "cancel",
            handler: () => {
              closeAlert();
            },
          },
          {
            text: "CONCLUIR AGORA",
            role: "confirm",
            handler: () => {
              closeAlert();
              history.push("/affiliate/paywall");
            },
          },
        ]}
      />
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
              <WarningButton onClick={() => history.push("/myplan")}>
                Assinar agora
              </WarningButton>
            </>
          )}

          {isApproved ? (
            <>
              <Option primary onClick={goToEdit}>
                <OptionIcon src={editIcon} alt="Ícone Editar Perfil" />
                Editar marca
              </Option>
              <Divider />

              <Option onClick={goToAdvertising}>
                <OptionIcon src={publicidadeIcon} alt="Ícone Publicidade" />
                Loja do Afiliado
              </Option>
              <Divider />

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
            </>
          ) : (
            <>
              <Title>Sua conta de afiliado ainda não foi aprovada</Title>
              <Paragraph>
                O processo de análise é feito pelo nosso time e pode levar até
                72 horas. <br />
                Assim que sua conta for aprovada, você receberá uma notificação
                e poderá acessar a área de afiliados normalmente.
              </Paragraph>
            </>
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