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

const AffiliateApprovedRegisterSuccess: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent style={{ "--background": "#E6C178" }}>
        <AffiliateSuccessContainer>
          <AffiliateTitle>Parabéns</AffiliateTitle>
          <AffiliateSubtitle>Bem-vindo ao Lupa!</AffiliateSubtitle>
          <AffiliateButtonContainer>
            <Button
              variant="secondary"
              onClick={() => history.push("/login", { refresh: true })}
            >
              VOLTAR PARA O INÍCIO
            </Button>
          </AffiliateButtonContainer>
        </AffiliateSuccessContainer>
      </IonContent>
    </IonPage>
  );
};

export default AffiliateApprovedRegisterSuccess;
