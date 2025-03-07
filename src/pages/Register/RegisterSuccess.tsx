import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { ContainerSucess, Title, Subtitle, ButtonContainer } from "./register.style";
import Button from '../../components/Button';

const RegisterSuccess: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent
        style={{
          "--background": "#E6C178",
        }}
      >
        <ContainerSucess>
          <Title>Parabéns!</Title>
          <Subtitle>Bem vindo ao Lupa</Subtitle>
          <ButtonContainer>
            <Button variant="secondary" onClick={() => history.push('/login')}>
              EFETUAR LOGIN
            </Button>
          </ButtonContainer>
        </ContainerSucess>
      </IonContent>
    </IonPage>
  );
};

export default RegisterSuccess;