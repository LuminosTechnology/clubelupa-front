// src/pages/ProfilePage/ProfilePage.tsx
import { IonAlert, IonContent, IonPage } from "@ionic/react";
import React, { useState } from "react";
import AppHeader from "../../components/SimpleHeader";

import {
  Avatar,
  AvatarWrapper,
  Button,
  ErrorMessage,
  Input,
  ProfileContainer,
  Title,
} from "./ChangePassword.style";

import { useAuthContext } from "../../contexts/AuthContext";
import { changePassword } from "../../services/auth-service";
import { useHistory } from "react-router";

const ProfileChangePasswordPage: React.FC = () => {
  const { user } = useAuthContext();
  const history = useHistory();
  const [formData, setFormData] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [successAlert, setSuccessAlert] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | undefined>();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.current_password)
      newErrors.current_password = "Senha atual é obrigatória";
    if (!formData.password) newErrors.password = "Nova senha é obrigatória";
    if (!formData.password_confirmation)
      newErrors.password_confirmation = "Confirmação de senha é obrigatória";

    if (formData.password !== formData.password_confirmation) {
      newErrors.password = "As senhas não coincidem";
      newErrors.password_confirmation = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await changePassword(formData);
      setResponseMessage(response.data.message);

      setSuccessAlert(true);
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

  return (
    <IonPage>
      <AppHeader
        title="Alterar Senha"
        backgroundColor="#868950"
        textColor="#FFFFFF"
      />

      <AvatarWrapper>
        <Avatar src={user?.avatar_url || "/assets/default-profile-photo.png"} />
      </AvatarWrapper>

      <IonContent fullscreen style={{ "--background": "#FFFFFF" } as any}>
        <ProfileContainer>
          <Title>Alterar Senha</Title>
          <Input
            type="password"
            placeholder="Senha atual"
            value={formData.current_password}
            onChange={(e) =>
              setFormData({ ...formData, current_password: e.target.value })
            }
            error={!!errors.current_password}
          />
          {errors.current_password && (
            <ErrorMessage>{errors.current_password}</ErrorMessage>
          )}
          <Input
            type="password"
            placeholder="Nova senha"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            error={!!errors.password}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          <Input
            type="password"
            placeholder="Confirmar senha"
            value={formData.password_confirmation}
            onChange={(e) =>
              setFormData({
                ...formData,
                password_confirmation: e.target.value,
              })
            }
            error={!!errors.password_confirmation}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation}</ErrorMessage>
          )}
          <Button onClick={handleSubmit}>ALTERAR SENHA</Button>
        </ProfileContainer>
        <IonAlert
          isOpen={successAlert}
          onDidDismiss={() => {
            setSuccessAlert(false);
            history.goBack();
          }}
          message={responseMessage || "Senha alterada com sucesso!"}
          header="Sucesso"
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
};

export default ProfileChangePasswordPage;
