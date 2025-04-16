import React, { useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";
import {
  AffiliateContainer,
  AffiliateErrorMessage,
  AffiliateButtonContainer,
} from "./affiliateRegister.style";

import BackButton from "../../components/BackButton";
import FloatingInput from "../../components/FloatingInput";
import Button from "../../components/Button";

// Importa a função que criamos no auth-service
import { registerAffiliate } from "../../services/auth-service";

const AffiliateRegister: React.FC = () => {
  const history = useHistory();
  const [affiliate, setAffiliate] = useState({
    nome_fantasia: "",
    cnpj: "",
    tempo_empresa: "", // <-- mudamos para tempo_empresa
    email: "",
    telefone: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!affiliate.nome_fantasia) {
      newErrors.nome_fantasia = "Nome Fantasia é obrigatório";
    }
    if (!affiliate.cnpj) {
      newErrors.cnpj = "CNPJ é obrigatório";
    }
    if (!affiliate.tempo_empresa) {
      newErrors.tempo_empresa = "Tempo de empresa é obrigatório";
    }
    if (!affiliate.email) {
      newErrors.email = "Email é obrigatório";
    }
    if (!affiliate.telefone) {
      newErrors.telefone = "Telefone é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAffiliateRegister = async () => {
    if (!validateForm()) return;

    try {
      // Faz a chamada para a função de cadastro de afiliado
      // Repare que "tempo_empresa" no state bate com "tempo_empresa" do backend
      await registerAffiliate({
        nome_fantasia: affiliate.nome_fantasia,
        cnpj: affiliate.cnpj,
        tempo_empresa: affiliate.tempo_empresa,
        telefone: affiliate.telefone,
        email: affiliate.email, // se o backend precisa deste campo
      });

      // Se deu tudo certo, vamos para a tela de sucesso
      history.push("/affiliate-register-success");
    } catch (error: any) {
      // Se o backend retornou algum erro, tratamos aqui
      const backendErrors = error.response?.data?.errors || {};
      const transformedErrors = Object.keys(backendErrors).reduce(
        (acc, key) => {
          const errorMessage = Array.isArray(backendErrors[key])
            ? backendErrors[key][0]
            : backendErrors[key];
          acc[key] = errorMessage;
          return acc;
        },
        {} as { [key: string]: string }
      );
      setErrors(transformedErrors);
    }
  };

  return (
    <IonPage>
      <IonContent style={{ "--background": "#E6C178" }}>
        <AffiliateContainer>
          <BackButton />
          <h2>Cadastre-se para ser um afiliado</h2>

          {/* Nome Fantasia */}
          <FloatingInput
            label="Nome Fantasia"
            value={affiliate.nome_fantasia}
            onChange={(value) =>
              setAffiliate({ ...affiliate, nome_fantasia: value })
            }
            error={!!errors.nome_fantasia}
          />
          {errors.nome_fantasia && (
            <AffiliateErrorMessage>{errors.nome_fantasia}</AffiliateErrorMessage>
          )}

          {/* CNPJ */}
          <FloatingInput
            label="CNPJ"
            value={affiliate.cnpj}
            onChange={(value) => setAffiliate({ ...affiliate, cnpj: value })}
            error={!!errors.cnpj}
          />
          {errors.cnpj && (
            <AffiliateErrorMessage>{errors.cnpj}</AffiliateErrorMessage>
          )}

          {/* Tempo de empresa */}
          <FloatingInput
            label="Tempo de empresa (em meses ou anos)"
            value={affiliate.tempo_empresa}
            onChange={(value) =>
              setAffiliate({ ...affiliate, tempo_empresa: value })
            }
            error={!!errors.tempo_empresa}
          />
          {errors.tempo_empresa && (
            <AffiliateErrorMessage>{errors.tempo_empresa}</AffiliateErrorMessage>
          )}

          {/* Email (se necessário no backend) */}
          <FloatingInput
            label="Email"
            value={affiliate.email}
            onChange={(value) => setAffiliate({ ...affiliate, email: value })}
            type="email"
            error={!!errors.email}
          />
          {errors.email && (
            <AffiliateErrorMessage>{errors.email}</AffiliateErrorMessage>
          )}

          {/* Telefone */}
          <FloatingInput
            label="Telefone"
            value={affiliate.telefone}
            onChange={(value) =>
              setAffiliate({ ...affiliate, telefone: value })
            }
            mask="(99)99999-9999"
            error={!!errors.telefone}
          />
          {errors.telefone && (
            <AffiliateErrorMessage>{errors.telefone}</AffiliateErrorMessage>
          )}

          {/* Mensagem de erro geral */}
          {Object.keys(errors).length > 0 && (
            <AffiliateErrorMessage style={{ marginBottom: "16px" }}>
              Por favor, corrija os campos acima para continuar.
            </AffiliateErrorMessage>
          )}

          <p style={{ marginTop: "16px", textAlign: "center" }}>
            Ao enviar as informações, sua empresa será submetida a um processo
            seletivo para avaliar sua conformidade com as normas e valores.
          </p>

          <AffiliateButtonContainer>
            <Button onClick={handleAffiliateRegister} variant="secondary">
              ENVIAR INFORMAÇÕES
            </Button>
          </AffiliateButtonContainer>

          <p
            style={{
              marginTop: "16px",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            Ao entrar, você concorda com nossos{" "}
            <a href="#" style={{ color: "#fff", textDecoration: "underline" }}>
              Termos e política de Privacidade
            </a>
          </p>
        </AffiliateContainer>
      </IonContent>
    </IonPage>
  );
};

export default AffiliateRegister;
