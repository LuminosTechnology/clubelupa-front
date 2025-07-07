import { IonPage, IonContent } from "@ionic/react";
import { Container, Text, ButtonContainer, ErrorMessage } from "./forgot.style";
import BackButton from "../../components/BackButton";
import FloatingInput from "../../components/FloatingInput";
import Button from "../../components/Button";
import { useState } from "react";
import Link from "../../components/Link";
import { useHistory } from "react-router";
import { forgotPassword } from "../../services/auth-service";

const ForgotPassword: React.FC = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    data_nascimento: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    }
    if (!formData.data_nascimento) {
      newErrors.data_nascimento = "Data de nascimento é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await forgotPassword({
        email: formData.email,
        data_nascimento: formData.data_nascimento,
      });

      setFormData({
        email: "",
        data_nascimento: "",
      });

      setErrors({});

      setSuccessMessage("Código solicitado com sucesso!");
      setTimeout(() => {
        history.push("/change-password", { email: formData.email });
      }, 2000);
    } catch (error: any) {
      const backendMessage = error.response?.data?.message;

      if (
        backendMessage ===
        "Usuário não encontrado com as credenciais fornecidas!"
      ) {
        setErrors({
          form: "E-mail ou data de nascimento inválidos",
        });
      } else {
        setErrors({
          form: backendMessage || "Erro ao solicitar código",
        });
      }
    }
  };

  return (
    <IonPage>
      <IonContent style={{ "--background": "var(--ion-color-tertiary)" }}>
        <Container>
          <BackButton />
          <h2>Esqueci minha senha</h2>
          <Text>
            Para sua segurança, enviaremos um código para validar a redefinição
            da senha.
          </Text>

          <FloatingInput
            label="Email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
            type="email"
            error={!!errors.email}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

          <FloatingInput
            label="Data de Nascimento"
            value={formData.data_nascimento}
            onChange={(value) =>
              setFormData({ ...formData, data_nascimento: value })
            }
            type="date"
            error={!!errors.data_nascimento}
          />
          {errors.data_nascimento && (
            <ErrorMessage>{errors.data_nascimento}</ErrorMessage>
          )}

          <ButtonContainer>
            {successMessage && (
              <ErrorMessage
                style={{
                  color: "#4CAF50",
                  fontSize: "16px",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: "16px",
                }}
              >
                {successMessage}
              </ErrorMessage>
            )}
            {errors.form && (
              <ErrorMessage style={{ fontSize: "16px", textAlign: "center" }}>
                {errors.form}
              </ErrorMessage>
            )}
            <Link onClick={() => history.push("/change/password")}>
              Já tenho o código de redefinição
            </Link>
            <Button
              onClick={handleSubmit}
              variant="secondary"
              style={{ marginTop: "32px" }}
            >
              SOLICITAR CÓDIGO
            </Button>
          </ButtonContainer>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
