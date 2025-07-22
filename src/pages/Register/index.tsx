/* ────────────────────────────────────────────
 * Register.tsx
 * ──────────────────────────────────────────── */
import React, { useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";

import {
  Container,
  ErrorMessage,
  ButtonContainer,
  TermsWrapper,
  TermsLink,
  DividerOr,
  LoginLinkContainer,
} from "./register.style";

import FloatingInput from "../../components/FloatingInput";
import Button from "../../components/Button";
import BackButton from "../../components/BackButton";
import Link from "../../components/Link";

import { register } from "../../services/auth-service";

const Register: React.FC = () => {
  const [user, setUser] = useState({
    nome_completo: "",
    data_nascimento: "",
    telefone: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const history = useHistory();

  /* ─────────── validação ─────────── */
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!user.nome_completo) newErrors.nome_completo = "Nome é obrigatório";
    if (!user.data_nascimento)
      newErrors.data_nascimento = "Data de nascimento é obrigatória";
    if (!user.telefone) newErrors.telefone = "Telefone é obrigatório";
    if (!user.email) newErrors.email = "Email é obrigatório";
    if (!user.password) newErrors.password = "Senha é obrigatória";
    if (!user.password_confirmation)
      newErrors.password_confirmation = "Confirmação de senha é obrigatória";
    if (user.password !== user.password_confirmation)
      newErrors.password_confirmation = "As senhas não coincidem";

    const birthDate = new Date(user.data_nascimento);
    const now = new Date();

    const age = now.getFullYear() - birthDate.getFullYear();
    const hadBirthdayThisYear =
      now.getMonth() < birthDate.getMonth() ||
      (now.getMonth() === birthDate.getMonth() &&
        now.getDate() >= birthDate.getDate());

    const finalAge = hadBirthdayThisYear ? age - 1 : age;

    if (finalAge < 18)
      newErrors.data_nascimento = "Você precisa ter 18 anos para se cadastrar";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setUser({
      nome_completo: "",
      data_nascimento: "",
      telefone: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
  };

  /* ─────────── ação de cadastro ─────────── */
  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      console.log({ user });
      await register(user);
      history.push("/register/verify-email", { email: user.email });
      resetForm();
    } catch (error: any) {
      const backendErrors = error.response?.data?.errors || {};

      const transformed = Object.keys(backendErrors).reduce((acc, key) => {
        const msg = Array.isArray(backendErrors[key])
          ? backendErrors[key][0]
          : backendErrors[key];
        acc[key] =
          key === "email" && msg === "The email has already been taken."
            ? "Este email já está cadastrado"
            : msg;
        return acc;
      }, {} as { [key: string]: string });

      setErrors(transformed);
    }
  };

  /* ─────────── UI ─────────── */
  return (
    <IonPage>
      <IonContent style={{ "--background": "#E6C178" }}>
        <Container>
          <BackButton />

          {/* título */}
          <h2>Cadastre-se</h2>

          {/* campos */}
          <FloatingInput
            label="Nome Completo"
            value={user.nome_completo}
            onChange={(v) => setUser({ ...user, nome_completo: v })}
            error={!!errors.nome_completo}
          />
          {errors.nome_completo && (
            <ErrorMessage>{errors.nome_completo}</ErrorMessage>
          )}

          <FloatingInput
            label="Data de Nascimento"
            value={user.data_nascimento}
            onChange={(v) => setUser({ ...user, data_nascimento: v })}
            type="date"
            error={!!errors.data_nascimento}
          />
          {errors.data_nascimento && (
            <ErrorMessage>{errors.data_nascimento}</ErrorMessage>
          )}

          <FloatingInput
            label="Telefone"
            value={user.telefone}
            onChange={(v) => setUser({ ...user, telefone: v })}
            error={!!errors.telefone}
            mask="(99)99999-9999"
          />
          {errors.telefone && <ErrorMessage>{errors.telefone}</ErrorMessage>}

          <FloatingInput
            label="Email"
            value={user.email}
            onChange={(v) => setUser({ ...user, email: v })}
            type="email"
            error={!!errors.email}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

          <FloatingInput
            label="Senha"
            value={user.password}
            onChange={(v) => setUser({ ...user, password: v })}
            isPassword
            error={!!errors.password}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

          <FloatingInput
            label="Confirmar Senha"
            value={user.password_confirmation}
            onChange={(v) => setUser({ ...user, password_confirmation: v })}
            isPassword
            error={!!errors.password_confirmation}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation}</ErrorMessage>
          )}

          {Object.keys(errors).length > 0 && (
            <ErrorMessage style={{ marginBottom: "16px" }}>
              Por favor, corrija os erros acima para continuar.
            </ErrorMessage>
          )}

          {/* botão criar conta */}
          <ButtonContainer>
            <Button onClick={handleRegister} variant="secondary">
              CRIAR CONTA
            </Button>
          </ButtonContainer>

          {/* consentimento + link */}
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

          {/* divisor */}
          <DividerOr>ou</DividerOr>

          {/* link para login */}
          <LoginLinkContainer>
            <Link onClick={() => history.push("/login")}>
              Já possui uma conta? Fazer Login
            </Link>
          </LoginLinkContainer>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Register;
