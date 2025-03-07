import React, { useState } from "react";
import { IonPage, IonContent, IonButton, IonIcon } from "@ionic/react";
import InputMask from "react-input-mask";
import { register } from "../../services/auth-service";
import { useHistory } from "react-router-dom";
import { Container, ErrorMessage } from "./register.style";
import arrowLeft from '../../assets/arrow-left.svg';
import FloatingInput from "../../components/FloatingInput";
import Button from "../../components/Button";
import { ButtonContainer } from "../Login/login.style";
import BackButton from "../../components/BackButton";

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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!user.nome_completo) {
      newErrors.nome_completo = 'Nome é obrigatório';
    }
    if (!user.data_nascimento) {
      newErrors.data_nascimento = 'Data de nascimento é obrigatória';
    }
    if (!user.telefone) {
      newErrors.telefone = 'Telefone é obrigatório';
    }
    if (!user.email) {
      newErrors.email = 'Email é obrigatório';
    }
    if (!user.password) {
      newErrors.password = 'Senha é obrigatória';
    }
    if (!user.password_confirmation) {
      newErrors.password_confirmation = 'Confirmação de senha é obrigatória';
    }
    if (user.password !== user.password_confirmation) {
      newErrors.password_confirmation = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      await register(user);
      history.push("/register-success");
    } catch (error: any) {
      const backendErrors = error.response?.data?.errors || {};

      // Transform backend error messages
      const transformedErrors = Object.keys(backendErrors).reduce((acc, key) => {
        // Check for array of error messages
        const errorMessage = Array.isArray(backendErrors[key])
          ? backendErrors[key][0]
          : backendErrors[key];

        if (key === 'email' && errorMessage === 'The email has already been taken.') {
          acc[key] = 'Este email já está cadastrado';
        } else {
          acc[key] = errorMessage;
        }
        return acc;
      }, {} as { [key: string]: string });

      setErrors(transformedErrors);
    }
  };

  return (
    <IonPage>
      <IonContent
        style={{
          "--background": "#E6C178",
        }}
      >
        <Container>
          <BackButton />
          <h2>Cadastre-se</h2>

          <FloatingInput
            label="Nome Completo"
            value={user.nome_completo}
            onChange={(value) => setUser({ ...user, nome_completo: value })}
            error={!!errors.nome_completo}
          />
          {errors.nome_completo && <ErrorMessage>{errors.nome_completo}</ErrorMessage>}

          <FloatingInput
            label="Data de Nascimento"
            value={user.data_nascimento}
            onChange={(value) => setUser({ ...user, data_nascimento: value })}
            type="date"
            error={!!errors.data_nascimento}
          />
          {errors.data_nascimento && <ErrorMessage>{errors.data_nascimento}</ErrorMessage>}

          <FloatingInput
            label="Telefone"
            value={user.telefone}
            onChange={(value) => setUser({ ...user, telefone: value })}
            error={!!errors.telefone}
            mask="(99)99999-9999"
          />
          {errors.telefone && <ErrorMessage>{errors.telefone}</ErrorMessage>}

          <FloatingInput
            label="Email"
            value={user.email}
            onChange={(value) => setUser({ ...user, email: value })}
            type="email"
            error={!!errors.email}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

          <FloatingInput
            label="Senha"
            value={user.password}
            onChange={(value) => setUser({ ...user, password: value })}
            isPassword
            error={!!errors.password}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

          <FloatingInput
            label="Confirmar Senha"
            value={user.password_confirmation}
            onChange={(value) => setUser({ ...user, password_confirmation: value })}
            isPassword
            error={!!errors.password_confirmation}
          />
          {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation}</ErrorMessage>}

          {Object.keys(errors).length > 0 && (
            <ErrorMessage style={{ marginBottom: '16px' }}>
              Por favor, corrija os erros acima para continuar.
            </ErrorMessage>
          )}

          <ButtonContainer>
            <Button onClick={handleRegister} variant="secondary">
              CRIAR CONTA
            </Button>
          </ButtonContainer>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Register;