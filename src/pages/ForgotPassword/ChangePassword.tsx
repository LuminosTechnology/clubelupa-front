import { IonPage, IonContent } from "@ionic/react";
import { Container, Text, ButtonContainer, ErrorMessage } from "./forgot.style";
import BackButton from "../../components/BackButton";
import FloatingInput from "../../components/FloatingInput";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { resetPassword } from "../../services/auth-service";

const ChangePassword: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const history = useHistory();
  const { email } = useParams<{ email: string }>();


  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.password) {
      newErrors.password = "Nova senha é obrigatória";
    }
    if (!formData.password_confirmation) {
      newErrors.password_confirmation = "Confirmação de senha é obrigatória";
    }
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await resetPassword({
        email: formData.email,
        code: formData.code,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      });

      setFormData({
        email: "",
        code: "",
        password: "",
        password_confirmation: "",
      });

      setErrors({});

      setSuccessMessage("Senha alterada com sucesso!");
      setTimeout(() => {
        history.push("/login");
      }, 3000);
    } catch (error: any) {
      const backendErrors = error.response?.data?.errors || {};
      const backendMessage = error.response?.data?.message;

      // Transform backend error messages
      const transformedErrors = Object.keys(backendErrors).reduce(
        (acc, key) => {
          const errorMessage = Array.isArray(backendErrors[key])
            ? backendErrors[key][0]
            : backendErrors[key];

          // Translate backend error messages
          if (
            key === "email" &&
            errorMessage === "The email field is required."
          ) {
            acc[key] = "Email é obrigatório";
          } else if (key === "code" && backendMessage === "Código inválido") {
            acc[key] = "Código inválido";
          } else {
            acc[key] = errorMessage;
          }
          return acc;
        },
        {} as { [key: string]: string }
      );

      setErrors({
        ...transformedErrors,
        form: error.response?.data?.message || "Erro ao alterar senha",
      });
    }
  };

  return (
    <IonPage>
      <IonContent style={{ "--background": "var(--ion-color-tertiary)" }}>
        <Container>
          <BackButton />
          <h2>Alterar Senha</h2>

          <FloatingInput
            label="Código de Verificação"
            value={formData.code}
            onChange={(value) => setFormData({ ...formData, code: value })}
            error={!!errors.code}
          />
          {errors.code && <ErrorMessage>{errors.code}</ErrorMessage>}

          <FloatingInput
            label="Email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
            type="email"
            error={!!errors.email}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

          <FloatingInput
            label="Nova Senha"
            value={formData.password}
            onChange={(value) => setFormData({ ...formData, password: value })}
            isPassword
            error={!!errors.password}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

          <FloatingInput
            label="Confirmar Senha"
            value={formData.password_confirmation}
            onChange={(value) =>
              setFormData({ ...formData, password_confirmation: value })
            }
            isPassword
            error={!!errors.password_confirmation}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation}</ErrorMessage>
          )}

          {successMessage && (
            <ErrorMessage
              style={{
                color: "#000",
                fontSize: "16px",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              {successMessage}
            </ErrorMessage>
          )}

          <ButtonContainer>
            <Button onClick={handleSubmit} variant="secondary">
              ALTERAR SENHA
            </Button>
          </ButtonContainer>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default ChangePassword;
