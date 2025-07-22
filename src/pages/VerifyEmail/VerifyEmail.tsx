import React, { useRef } from "react";
import { IonPage, IonContent } from "@ionic/react";
import {
  ContentWrapper,
  CustomContent,
  ErrorMessage,
  Input,
  InputContainer,
  Text,
  Title,
} from "./VerifyEmail.styles";
import Button from "../../components/Button";

import BackButton from "../../components/BackButton";
import { useHistory, useLocation } from "react-router";
import { verifyEmail } from "../../services/auth-service";
import { AxiosError } from "axios";

type VerifyEmailState = {
  email: string;
};

const VerifyEmail: React.FC = () => {
  const location = useLocation<VerifyEmailState>();
  const history = useHistory();
  const email = location?.state?.email;
  console.log({ email });
  const [error, setError] = React.useState<string | null>(null);

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
      return newCode;
    });
    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const onSubmit = async () => {
    console.log({ code: code.join(""), email });
    try {
      await verifyEmail({ email, code: code.join("") });
      resetForm();
      history.push("/login");
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.status === 404) {
          setError(err.response?.data.message);
        } else {
          setError(
            "Ocorreu um erro ao tentar verificar o código. Tente novamente."
          );
        }
      }
    }
  };

  const resetForm = () => {
    setCode(["", "", "", ""]);
  };

  const isDisabled = code.some((c) => c === "" || c.length !== 1);

  return (
    <IonPage>
      <CustomContent style={{ "--background": "#E6C178" }}>
        <BackButton />
        <ContentWrapper>
          <Title>Digite o código</Title>
          <Text>recebido no seu e-mail para confirmar a sua conta:</Text>

          <InputContainer>
            {inputRefs.map((ref, index) => (
              <Input
                key={index}
                value={code[index]}
                type="text"
                maxLength={1}
                ref={ref}
                onKeyDown={(e) => onKeyDown(e, index)}
                onChange={(e) => handleInputChange(e, index)}
              />
            ))}
          </InputContainer>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button variant="secondary" onClick={onSubmit} disabled={isDisabled}>
            ENVIAR
          </Button>
        </ContentWrapper>
      </CustomContent>
    </IonPage>
  );
};

export default VerifyEmail;
