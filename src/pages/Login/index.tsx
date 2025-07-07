/* ────────────────────────────────────────────
 * Login.tsx
 * ──────────────────────────────────────────── */
import React, { useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";

import {
  Container,
  DividerOr,
  ErrorMessage,
  ForgotPasswordWrapper,
  FormWrapper,
  FormTitle,
  LogoWrapper,
  LoginButtonWrapper,
  RegisterContainer,
  TermsWrapper,
  TermsLink,
} from "./login.style";

import FloatingInput from "../../components/FloatingInput";
import Link from "../../components/Link";
import Button from "../../components/Button";
import { login } from "../../services/auth-service";

import Logo from "../../assets/Logo.svg";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const history = useHistory();

  /* ─────────── helpers ─────────── */
  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email) newErrors.email = "Email é obrigatório";
    else if (!validateEmail(email)) newErrors.email = "Digite um email válido";

    if (!password) newErrors.password = "Senha é obrigatória";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ─────────── actions ─────────── */
  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      await login({ email, password });
      history.push("/home");
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao fazer login!";
      setErrors({
        form: message,
        ...(error.response?.data?.errors || {}),
      });
    }
  };

  const handleRegister = () => history.push("/register");

  /* ─────────── UI ─────────── */
  return (
    <IonPage>
      <IonContent style={{ "--background": "#9fa369" }}>
        <Container>
          {/* logo */}
          <LogoWrapper>
            <img src={Logo} alt="Logo" style={{ width: 160 }} />
          </LogoWrapper>

          {/* formulário de login */}
          <FormWrapper>
            <FormTitle>Entrar</FormTitle>

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

            <ForgotPasswordWrapper>
              <Link onClick={() => history.push("/forgot/password")}>
                Esqueci minha senha
              </Link>
            </ForgotPasswordWrapper>

            <LoginButtonWrapper>
              <Button onClick={handleLogin}>ENTRAR</Button>
            </LoginButtonWrapper>
          </FormWrapper>

          {/* consentimento */}
          <TermsWrapper>
            <div>Ao entrar, você concorda com nossos</div>
            <TermsLink
              onClick={() =>
                window.open("https://www.google.com", "_blank", "noopener")
              }
            >
              Termos e política de privacidade
            </TermsLink>
          </TermsWrapper>

          {/* divisor “ou” */}
          <DividerOr>ou</DividerOr>

          {/* registro */}
          <RegisterContainer>
            <Link onClick={handleRegister}>
              Ainda não tem conta? Cadastre-se
            </Link>
          </RegisterContainer>

          {errors.form && (
            <ErrorMessage
              style={{
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {errors.form}
            </ErrorMessage>
          )}
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Login;
