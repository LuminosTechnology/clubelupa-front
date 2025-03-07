import React, { useState } from "react";
import { IonPage, IonContent, IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { login } from "../../services/auth-service";
import { ButtonContainer, Container, DividerContainer, ErrorMessage, LinkContainer, RegisterContainer } from "./login.style";
import FloatingInput from "../../components/FloatingInput";
import Button from "../../components/Button";
import Link from "../../components/Link";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const history = useHistory();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Digite um email válido';
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      await login({ email, password });
      history.push("/home");
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao fazer login!";
      setErrors({
        form: message,
        ...(error.response?.data?.errors || {})
      });
    }
  };

  const handleRegister = () => {
    history.push("/register");
  };

  return (
    <IonPage>
      <IonContent
        style={{
          "--background": "#9fa369",
        }}
      >
        <Container>
          <h2>Entrar</h2>

          <FloatingInput
            label="Email"
            value={email}
            onChange={setEmail}
            type="email"
            error={!!errors.email}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

          <FloatingInput
            label="Senha"
            value={password}
            onChange={setPassword}
            isPassword
            error={!!errors.password}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

          <div className="forgot-password" style={{ alignSelf: 'flex-end', marginTop: '10px' }}>
            <Link onClick={() => history.push('/forgot-password')}>
              Esqueci minha senha
            </Link>
          </div>

          {errors.form && <ErrorMessage style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>{errors.form}</ErrorMessage>}

          <ButtonContainer>
            <Button onClick={handleLogin}>
              ENTRAR
            </Button>

            <LinkContainer>
              <div>Ao entrar, você concorda com nossos</div>
              <Link onClick={() => window.open('https://www.google.com', '_blank')}>
                Termos e política de privacidade
              </Link>
            </LinkContainer>
          </ButtonContainer>

          <RegisterContainer>
            <DividerContainer>
              <div>ou</div>
            </DividerContainer>
            <Link onClick={handleRegister}>
              Ainda não tem conta? Cadastre-se
            </Link>
          </RegisterContainer>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Login;