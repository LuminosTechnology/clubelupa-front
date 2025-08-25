import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";
import {
  AffiliateSuccessContainer,
  AffiliateTitle,
  AffiliateSubtitle,
  AffiliateButtonContainer,
} from "./affiliateRegister.style";
import Button from "../../components/Button";

const AffiliatePendingApprovalRegisterSuccess: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent style={{ "--background": "#E6C178" }}>
        <AffiliateSuccessContainer>
          <AffiliateTitle>Cadastro enviado com sucesso!</AffiliateTitle>
          <AffiliateSubtitle>
            O processo seletivo pode levar até 72 horas para ser concluido. Até
            lá, navegue como sócio e aproveite nosso aplicativo para ter as
            melhores experiencias.
          </AffiliateSubtitle>
          <AffiliateButtonContainer>
            <Button
              variant="secondary"
              onClick={() => history.replace("/login")}
            >
              VOLTAR PARA O INÍCIO
            </Button>
          </AffiliateButtonContainer>
        </AffiliateSuccessContainer>
      </IonContent>
    </IonPage>
  );
};

export default AffiliatePendingApprovalRegisterSuccess;
