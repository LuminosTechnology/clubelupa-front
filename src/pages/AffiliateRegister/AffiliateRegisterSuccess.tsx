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

const AffiliateRegisterSuccess: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent style={{ "--background": "#E6C178" }}>
        <AffiliateSuccessContainer>
          <AffiliateTitle>Cadastro enviado com sucesso!</AffiliateTitle>
          <AffiliateSubtitle>
            O processo seletivo pode levar até 72 horas para ser concluído.
          </AffiliateSubtitle>
          <AffiliateButtonContainer>
            <Button variant="secondary" onClick={() => history.push("/")}>
              VOLTAR PARA O INÍCIO
            </Button>
          </AffiliateButtonContainer>
        </AffiliateSuccessContainer>
      </IonContent>
    </IonPage>
  );
};

export default AffiliateRegisterSuccess;
