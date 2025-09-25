/* ────────────────────────────────────────────
 * Login.tsx
 * ──────────────────────────────────────────── */
import React, { useState } from "react";
import { IonPage, IonContent, useIonRouter } from "@ionic/react";
import { useHistory } from "react-router";

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
  RegisterAffiliateLink,
} from "./login.style";
import { Browser } from "@capacitor/browser";

import FloatingInput from "../../components/FloatingInput";
import Link from "../../components/Link";
import Button from "../../components/Button";
import { login } from "../../services/auth-service";

import Logo from "../../assets/Logo.svg?react";

import { useAuthContext } from "../../contexts/AuthContext";
import { AxiosError } from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const history = useHistory();

  const { setIsAuthenticated, setUser } = useAuthContext();

  /* ─────────── helpers ─────────── */
  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email) newErrors.email = "Email é obrigatório";
    else if (!validateEmail(email)) newErrors.email = "Digite um email válido";

    if (!password) newErrors.password = "Senha é obrigatória";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const router = useIonRouter();
  /* ─────────── actions ─────────── */
  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const response = await login({ email, password });
      setUser(response.data.user);
      setIsAuthenticated(true);
      router.push("/home", "root");
      resetForm();
    } catch (error: any) {
      if (error instanceof AxiosError) {
        if (error.status === 403) {
          // se e-mail da conta não está verificado
          history.push("/register/verify-email", { email });
          return;
        }
      }

      const message = error.response?.data?.message || "Erro ao fazer login!";
      setErrors({
        form: message,
        ...(error.response?.data?.errors || {}),
      });
    }
  };

  const handleRegister = () => history.push("/register");
  const handleRegisterAffiliate = () => history.push("/register/affiliate");

  const handleDeleteAccountByWeb = async () => {
    await Browser.open({
      url: "https://app.clubelupa.com.br/request-account-deletion",
    });
  };

  /* ─────────── UI ─────────── */
  return (
    <IonPage>
      <IonContent style={{ "--background": "#9fa369" }}>
        <Container>
          {/* logo */}
          <LogoWrapper>
            <Logo />
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

            <ForgotPasswordWrapper>
              <Link onClick={handleDeleteAccountByWeb}>
                Excluir minha conta via web
              </Link>
            </ForgotPasswordWrapper>
            <LoginButtonWrapper>
              <Button onClick={handleLogin}>ENTRAR</Button>
            </LoginButtonWrapper>
          </FormWrapper>

          {/* consentimento */}
          <TermsWrapper>
            <div>Ao entrar, você concorda com nossos</div>
            <div>
              <TermsLink
                onClick={() =>
                  window.open("https://app.clubelupa.com.br/termos-e-condicoes", "_blank", "noopener")
                }
              >
                Termos
              </TermsLink>
              &nbsp;e&nbsp;
              <TermsLink
                onClick={() =>
                  window.open("https://app.clubelupa.com.br/politica-de-privacidade", "_blank", "noopener")
                }
              >
                política de privacidade
              </TermsLink> 
            </div>           
          </TermsWrapper>

          {/* divisor “ou” */}
          <DividerOr>ou</DividerOr>

          {/* registro */}
          <RegisterContainer>
            <Link onClick={handleRegister}>
              Ainda não tem conta? Cadastre-se
            </Link>

            <RegisterAffiliateLink onClick={handleRegisterAffiliate}>
              Quero cadastrar minha marca
            </RegisterAffiliateLink>
          </RegisterContainer>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Login;
