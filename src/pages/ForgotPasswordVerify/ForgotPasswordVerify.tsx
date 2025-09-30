import React, { useRef, useState } from "react";
import { IonPage, IonContent, IonAlert } from "@ionic/react";
import {
  ContentWrapper,
  CustomContent,
  ErrorMessage,
  Input,
  CodeInputContainer,
  Text,
  Title,
  InputContainer,
} from "./styles";
import Button from "../../components/Button";

import BackButton from "../../components/BackButton";
import { Redirect, useHistory, useLocation } from "react-router";
import { forgotPasswordVerify, verifyEmail } from "../../services/auth-service";
import axios, { AxiosError } from "axios";
import FloatingInput from "../../components/FloatingInput";
import { ForgotPasswordVerifyRequest } from "../../services/interfaces/Auth";

type VerifyEmailState = {
  email: string;
  nextPage?: string;
};

const ForgotPasswordVerify: React.FC = () => {
  const location = useLocation<VerifyEmailState>();
  const history = useHistory();
  const { email, nextPage } = location?.state || {};
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const [form, setForm] = React.useState({
    password: "",
    password_confirmation: "",
    code: "",
  });

  const [code, setCode] = React.useState(["", "", "", ""]);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && !event.currentTarget.value) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = event?.target?.value;
    setCode((prev) => {
      const newCode = [...prev];
      newCode[index] = value;
      setForm((prev) => ({ ...prev, code: newCode.join("") }));
      return newCode;
    });
    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };


  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.password) newErrors.password = "Senha é obrigatória";
    if (!form.password_confirmation)
      newErrors.password_confirmation = "Senha é obrigatória";
    if (!form.code) newErrors.code = "Código é obrigatório";

    if (form.password !== form.password_confirmation) {
      newErrors.password_confirmation = "As senhas não coincidem";
      newErrors.password = "As senhas não coincidem";
    }

    setError(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await forgotPasswordVerify({
          email: email,
          code: form.code,
          password: form.password,
          password_confirmation: form.password_confirmation,
        });

        if (response.status === 200) {
          setAlertMessage(response.message);
        }
      } catch (err: any) {
        if (axios.isAxiosError(err)) {
          const axiosErr = err as AxiosError<{
            message?: string;
            errors?: Record<string, string[]>;
          }>;

          // Se o backend retornar um campo específico de errors (não é o seu caso, mas deixa pronto)
          if (axiosErr.response?.data?.errors) {
            const transformedErrors = Object.entries(
              axiosErr.response.data.errors
            ).reduce((acc, [key, value]) => {
              acc[key] = Array.isArray(value) ? value[0] : value;
              return acc;
            }, {} as Record<string, string>);
            setError(transformedErrors);
          }
          // Caso o backend só retorne message (ex: "Código inválido.")
          else if (axiosErr.response?.data?.message) {
            setError({ form: axiosErr.response.data.message });
          }
          // Fallback genérico
          else {
            setError({ form: "Erro desconhecido." });
          }
        } else {
          // Caso não seja erro do Axios
          setError({ form: "Erro inesperado." });
        }
      }
    }
  };

  const resetForm = () => {
    setForm({
      password: "",
      password_confirmation: "",
      code: "",
    });
    setCode(["", "", "", ""]);
  };

  if (!email) return <Redirect to="/login" />;

  return (
    <IonPage>
      <IonAlert
        isOpen={!!alertMessage}
        header="Sucesso"
        message={alertMessage || ""}
        onDidDismiss={() => {
          setAlertMessage(null);
          history.push("/login");
        }}
        buttons={["OK"]}
      />
      <CustomContent style={{ "--background": "#E6C178" }}>
        <BackButton onClick={() => history.push("/login")} />
        <ContentWrapper>
          <Title>Digite o código</Title>
          <Text>recebido no seu e-mail para alterar sua senha:</Text>

          <InputContainer>
            <CodeInputContainer>
              {inputRefs.map((ref, index) => (
                <Input
                  key={index}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={code[index]}
                  type="number"
                  maxLength={1}
                  ref={ref}
                  onKeyDown={(e) => onKeyDown(e, index)}
                  onChange={(e) => handleInputChange(e, index)}
                />
              ))}
            </CodeInputContainer>

            {error.code && <ErrorMessage>{error.code}</ErrorMessage>}
          </InputContainer>

          <InputContainer>
            <FloatingInput
              label="Nova senha"
              value={form.password}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, password: e }));
              }}
            />
            {error.password && <ErrorMessage>{error.password}</ErrorMessage>}
          </InputContainer>
          <InputContainer>
            <FloatingInput
              label="Confirmar senha"
              value={form.password_confirmation}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, password_confirmation: e }));
              }}
            />

            {error.password_confirmation && (
              <ErrorMessage>{error.password_confirmation}</ErrorMessage>
            )}
          </InputContainer>

          <InputContainer>
            {error.form && <ErrorMessage>{error.form}</ErrorMessage>}
            <Button variant="secondary" onClick={onSubmit}>
              ENVIAR
            </Button>
          </InputContainer>
        </ContentWrapper>
      </CustomContent>
    </IonPage>
  );
};

export default ForgotPasswordVerify;
