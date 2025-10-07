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
import { RegisterUserRequest } from "../../types/api/user";
import { validateBirthDate } from "../../utils/validate-birth-date";

const Register: React.FC = () => {
  const [form, setForm] = useState<RegisterUserRequest>({
    name: "",
    email: "",
    birth_date: "",
    password: "",
    password_confirmation: "",
    phone_number: "",
    auto_premium_code: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const history = useHistory();

  /* ─────────── validação ─────────── */
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.name) newErrors.name = "Nome é obrigatório";
    if (!form.birth_date)
      newErrors.data_nascimento = "Data de nascimento é obrigatória";

    const birthDateError = validateBirthDate(form.birth_date);
    if (birthDateError) newErrors.data_nascimento = birthDateError;

    if (!form.phone_number) newErrors.phone_number = "Telefone é obrigatório";
    if (!form.email) newErrors.email = "Email é obrigatório";
    if (!form.password) newErrors.password = "Senha é obrigatória";
    if (!form.password_confirmation)
      newErrors.password_confirmation = "Confirmação de senha é obrigatória";
    if (form.password !== form.password_confirmation)
      newErrors.password_confirmation = "As senhas não coincidem";

    const birthDate = new Date(form.birth_date);
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
    setForm({
      name: "",
      birth_date: "",
      phone_number: "",
      email: "",
      password: "",
      password_confirmation: "",
      auto_premium_code: "",
    });
  };

  /* ─────────── ação de cadastro ─────────── */
  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      await register(form);
      history.push("/register/verify-email", { email: form.email });
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
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
            error={!!errors.nome_completo}
          />
          {errors.nome_completo && (
            <ErrorMessage>{errors.nome_completo}</ErrorMessage>
          )}

           <FloatingInput
            label="Data de Nascimento"
            value={form.birth_date}
            onChange={(v) => setForm({ ...form, birth_date: v })}
            type="text"
            inputMode="numeric"
            mask="99/99/9999"
            error={!!errors.data_nascimento}
          />
          {errors.data_nascimento && (
            <ErrorMessage>{errors.data_nascimento}</ErrorMessage>
          )}

          <FloatingInput
            label="Telefone"
            value={form.phone_number}
            onChange={(v) => setForm({ ...form, phone_number: v })}
            error={!!errors.telefone}
            mask="(99)99999-9999"
          />
          {errors.telefone && <ErrorMessage>{errors.telefone}</ErrorMessage>}

          <FloatingInput
            label="Email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            type="email"
            error={!!errors.email}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

          <FloatingInput
            label="Senha"
            value={form.password}
            onChange={(v) => setForm({ ...form, password: v })}
            isPassword
            error={!!errors.password}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

          <FloatingInput
            label="Confirmar Senha"
            value={form.password_confirmation}
            onChange={(v) => setForm({ ...form, password_confirmation: v })}
            isPassword
            error={!!errors.password_confirmation}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation}</ErrorMessage>
          )}

          <FloatingInput
            label="Código automático de sócio"
            value={form.auto_premium_code || ""}
            onChange={(v) => setForm({ ...form, auto_premium_code: v })}
            maxLength={50}
          />

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
