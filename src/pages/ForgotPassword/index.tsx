import { IonPage, IonContent, IonAlert, IonSpinner } from "@ionic/react";
import { Container, Text, ButtonContainer, ErrorMessage } from "./forgot.style";
import BackButton from "../../components/BackButton";
import FloatingInput from "../../components/FloatingInput";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
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
  const [displayErrorAlert, setDisplayErrorAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [displaySuccessAlert, setDisplaySuccessAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    }
    // if (!formData.data_nascimento) {
    //   newErrors.data_nascimento = "Data de nascimento é obrigatória";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!validateForm()) return;

    try {
      const response = await forgotPassword({
        email: formData.email,
        data_nascimento: formData.data_nascimento,
      });

      setSuccessMessage(response.message);
      setDisplaySuccessAlert(true);
      setFormData({
        email: "",
        data_nascimento: "",
      });

      setErrors({});
    } catch (error: any) {
      const backendMessage = error.response?.data?.message;
      setErrors({
        form: backendMessage || "Erro ao solicitar código",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (errors.form) {
      setDisplayErrorAlert(true);
    }
  }, [errors.form]);

  return (
    <IonPage>
      <IonAlert
        isOpen={displayErrorAlert}
        onDidDismiss={() => {
          setErrors((prev) => ({ ...prev, form: "" }));
          setDisplayErrorAlert(false);
        }}
        header="Erro"
        message={errors.form}
        buttons={["OK"]}
      />
      <IonAlert
        isOpen={displaySuccessAlert}
        onDidDismiss={() => setSuccessMessage("")}
        header="Sucesso"
        message={successMessage}
        buttons={["OK"]}
      />
      <IonContent style={{ "--background": "var(--ion-color-tertiary)" }}>
        <Container>
          <BackButton />
          <Text>
            <h2>Esqueci minha senha</h2>
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

          {/* <FloatingInput
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
          )} */}

          <ButtonContainer>
            {errors.form && (
              <ErrorMessage style={{ fontSize: "16px", textAlign: "center" }}>
                {errors.form}
              </ErrorMessage>
            )}
            {/* <Link onClick={() => history.push("/change/password")}>
              Já tenho o código de redefinição
            </Link> */}
            <Button
              disabled={isLoading}
              onClick={handleSubmit}
              variant="secondary"
              style={{ marginTop: "32px" }}
            >
              {isLoading ? <IonSpinner color="primary" /> : "ALTERAR SENHA"}
            </Button>
          </ButtonContainer>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
