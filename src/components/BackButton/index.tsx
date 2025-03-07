import { IonPage, IonContent } from "@ionic/react";
import { Container, BackButton } from "./backButton.style";
import arrowLeft from '../../assets/arrow-left.svg';
import { useHistory } from "react-router";

const ForgotPassword: React.FC = () => {
  const history = useHistory();

  return (
    <BackButton
      src={arrowLeft}
      onClick={() => history.goBack()}
      alt="Voltar"
    />
  );
};

export default ForgotPassword;