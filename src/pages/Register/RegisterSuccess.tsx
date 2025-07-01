/* ────────────────────────────────────────────
 * RegisterSuccess.tsx
 * ──────────────────────────────────────────── */
import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";

import {
  Container,
  Title,
  Subtitle,
  ButtonWrapper,
  BackButtonWrapper,   /* ← novo wrapper */
} from "./register-success.style";

import Button from "../../components/Button";
import BackButton from "../../components/BackButton";

const RegisterSuccess: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent style={{ "--background": "#E6C178" }}>
        {/* botão de voltar fixo no canto superior-esquerdo */}
        <BackButtonWrapper>
          <BackButton />
        </BackButtonWrapper>

        {/* conteúdo centralizado verticalmente */}
        <Container>
          <Title>Parabéns</Title>
          <Subtitle>Bem vindo ao Lupa</Subtitle>

          <ButtonWrapper>
            <Button variant="secondary" onClick={() => history.push("/login")}>
              EFETUAR LOGIN
            </Button>
          </ButtonWrapper>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default RegisterSuccess;
