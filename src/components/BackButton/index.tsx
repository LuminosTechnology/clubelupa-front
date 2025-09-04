import { IonPage, IonContent } from "@ionic/react";
import { Container, BackButton } from "./backButton.style";
import arrowLeft from "../../assets/arrow-left.svg";
import { useHistory } from "react-router";

type BackButtonProps = {
  onClick?: () => unknown;
};

const ForgotPassword: React.FC<BackButtonProps> = ({ onClick }) => {
  const history = useHistory();

  return (
    <BackButton
      src={arrowLeft}
      onClick={() => {
        onClick ? onClick() : history.goBack();
      }}
      alt="Voltar"
    />
  );
};

export default ForgotPassword;
