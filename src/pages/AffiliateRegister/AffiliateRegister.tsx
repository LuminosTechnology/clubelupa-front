import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonRadioGroup,
  IonRadio,
  IonText,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import {
  AffiliateContainer,
  AffiliateErrorMessage,
  AffiliateButtonContainer,
  AffiliateRadioInputWrapper,
  AffiliateRadioInputContainer,
  RadioOption,
} from "./affiliateRegister.style";

import BackButton from "../../components/BackButton";
import FloatingInput from "../../components/FloatingInput";
import Button from "../../components/Button";

// Importa a função que criamos no auth-service
import { registerAffiliate } from "../../services/auth-service";

const AffiliateRegister: React.FC = () => {
  const history = useHistory();
  const [hasPhysicalAddress, setHasPhysicalAddress] = useState(false);
  const [affiliate, setAffiliate] = useState({
    // nome_fantasia: "",
    cnpj: "",
    tempo_empresa: "", // <-- mudamos para tempo_empresa
    email: "",
    // telefone: "",

    razao_social: "",
    nome_marca: "",
    instagram: "",
    site: "",
    whatsapp: "",

    horario_funcionamento: "",
    cep: "",
    rua: "",
    numeroEndereco: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",

    tipo_atividade: "",
    envio_produtos: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // if (!affiliate.nome_fantasia) {
    //   newErrors.nome_fantasia = "Nome Fantasia é obrigatório";
    // }
    if (!affiliate.razao_social) {
      newErrors.razao_social = "Razão Social é obrigatório";
    }
    if (!affiliate.nome_marca) {
      newErrors.nome_marca = "Nome da Marca é obrigatório";
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
    // if (!affiliate.telefone) {
    //   newErrors.telefone = "Telefone é obrigatório";
    // }

    if (hasPhysicalAddress) {
      if (!affiliate.horario_funcionamento) {
        newErrors.horario_funcionamento =
          "Horário de funcionamento é obrigatório";
      }
      if (!affiliate.cep) newErrors.cep = "CEP é obrigatório";
      if (!affiliate.rua) newErrors.rua = "Rua é obrigatório";
      if (!affiliate.numeroEndereco)
        newErrors.numeroEndereco = "Número é obrigatório";
      if (!affiliate.bairro) newErrors.bairro = "Bairro é obrigatório";
      if (!affiliate.cidade) newErrors.cidade = "Cidade é obrigatório";
      if (!affiliate.uf) newErrors.uf = "UF é obrigatório";
    }

    setErrors(newErrors);
    console.log({});
    return Object.keys(newErrors).length === 0;
  };

  const handleAffiliateRegister = async () => {
    if (!validateForm()) return;

    try {
      // Faz a chamada para a função de cadastro de afiliado
      // Repare que "tempo_empresa" no state bate com "tempo_empresa" do backend
      await registerAffiliate({
        // nome_fantasia: affiliate.nome_fantasia,
        cnpj: affiliate.cnpj,
        tempo_empresa: affiliate.tempo_empresa,
        // telefone: affiliate.telefone,
        email: affiliate.email, // se o backend precisa deste campo
      });

      // Se deu tudo certo, vamos para a tela de sucesso
      history.push("/affiliate/register/success");
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

  const formatInstagramHandle = (value: string) => {
    // Remove caracteres não-alfanuméricos
    let handle = value.replace(/[^a-zA-Z0-9_.]/g, "");

    // Evitar pontos duplicados ou seguidos
    handle = handle.replace(/\.+/g, "."); // Troca ... por .
    handle = handle.replace(/\._+/g, "_"); // Troca .___ por ._
    handle = handle.replace(/_+/g, "_"); // Troca ____ por _
    handle = handle.replace(/\.+/g, "."); // Garante que múltiplos pontos seguidos virem 1 ponto

    // Remove ponto no início
    handle = handle.replace(/^\./g, "");

    // Limita a 30 caracteres
    handle = handle.slice(0, 30);

    return handle;
  };

  return (
    <IonPage>
      <IonContent
        forceOverscroll={true}
        scrollY
        style={{ "--background": "#E6C178" }}
      >
        <AffiliateContainer>
          <BackButton />
          <h2>Cadastre-se para ser um afiliado</h2>

          {/* Razão Social */}
          <FloatingInput
            label="Razão Social"
            value={affiliate.razao_social}
            onChange={(value) =>
              setAffiliate({ ...affiliate, razao_social: value })
            }
            error={!!errors.razao_social}
          />
          {errors.razao_social && (
            <AffiliateErrorMessage>{errors.razao_social}</AffiliateErrorMessage>
          )}

          {/* CNPJ */}
          <FloatingInput
            label="CNPJ"
            value={affiliate.cnpj}
            onChange={(value) => setAffiliate({ ...affiliate, cnpj: value })}
            error={!!errors.cnpj}
            mask="99.999.999/9999-99"
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
            <AffiliateErrorMessage>
              {errors.tempo_empresa}
            </AffiliateErrorMessage>
          )}

          {/* Nome da Marca */}
          <FloatingInput
            label="Nome da Marca"
            value={affiliate.nome_marca}
            onChange={(value) =>
              setAffiliate({ ...affiliate, nome_marca: value })
            }
            error={!!errors.nome_marca}
          />
          {errors.nome_marca && (
            <AffiliateErrorMessage>{errors.nome_marca}</AffiliateErrorMessage>
          )}

          {/* Instagram */}
          <FloatingInput
            label="Instagram (opcional)"
            value={`@${affiliate.instagram}`}
            onChange={(value) =>
              setAffiliate({
                ...affiliate,
                instagram: formatInstagramHandle(value),
              })
            }
            error={!!errors.instagram}
          />
          {errors.instagram && (
            <AffiliateErrorMessage>{errors.instagram}</AffiliateErrorMessage>
          )}

          {/* Site */}
          <FloatingInput
            label="Site (opcional)"
            value={affiliate.site}
            onChange={(value) =>
              setAffiliate({
                ...affiliate,
                site: value,
              })
            }
            error={!!errors.site}
          />
          {errors.site && (
            <AffiliateErrorMessage>{errors.site}</AffiliateErrorMessage>
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

          {/* Telefone
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
          )} */}

          {/* Whatsapp */}
          <FloatingInput
            label="WhatsApp"
            value={affiliate.whatsapp}
            onChange={(value) =>
              setAffiliate({ ...affiliate, whatsapp: value })
            }
            mask="(99)99999-9999"
            error={!!errors.whatsapp}
          />
          {errors.whatsapp && (
            <AffiliateErrorMessage>{errors.whatsapp}</AffiliateErrorMessage>
          )}

          <AffiliateRadioInputWrapper>
            <IonText>Possui endereço físico?</IonText>
            <IonRadioGroup
              value={hasPhysicalAddress ? "true" : "false"}
              onIonChange={(e) =>
                setHasPhysicalAddress(e.detail.value === "true")
              }
            >
              <AffiliateRadioInputContainer>
                <IonRadio value="true" labelPlacement="end" color="dark">
                  Sim
                </IonRadio>
                <IonRadio value="false" labelPlacement="end" color="dark">
                  Não
                </IonRadio>
              </AffiliateRadioInputContainer>
            </IonRadioGroup>
          </AffiliateRadioInputWrapper>

          {hasPhysicalAddress && (
            <>
              {/* Horário de Funcionamento */}
              <FloatingInput
                label="Horário de Funcionamento"
                value={affiliate.horario_funcionamento}
                onChange={(value) =>
                  setAffiliate({ ...affiliate, horario_funcionamento: value })
                }
                error={!!errors.horario_funcionamento}
              />
              {errors.horario_funcionamento && (
                <AffiliateErrorMessage>
                  {errors.horario_funcionamento}
                </AffiliateErrorMessage>
              )}

              {/* CEP */}
              <FloatingInput
                label="CEP"
                value={affiliate.cep}
                onChange={(value) => setAffiliate({ ...affiliate, cep: value })}
                mask="99999-999"
                error={!!errors.cep}
              />
              {errors.cep && (
                <AffiliateErrorMessage>{errors.cep}</AffiliateErrorMessage>
              )}

              {/* Rua */}
              <FloatingInput
                label="Rua"
                value={affiliate.rua}
                onChange={(value) => setAffiliate({ ...affiliate, rua: value })}
                error={!!errors.rua}
              />
              {errors.rua && (
                <AffiliateErrorMessage>{errors.rua}</AffiliateErrorMessage>
              )}

              {/* Numero */}
              <FloatingInput
                label="Número"
                value={affiliate.numeroEndereco}
                onChange={(value) =>
                  setAffiliate({ ...affiliate, numeroEndereco: value })
                }
                error={!!errors.numeroEndereco}
                type="number"
              />
              {errors.numeroEndereco && (
                <AffiliateErrorMessage>
                  {errors.numeroEndereco}
                </AffiliateErrorMessage>
              )}

              {/* Complemento */}
              <FloatingInput
                label="Complemento (opcional)"
                value={affiliate.complemento}
                onChange={(value) =>
                  setAffiliate({ ...affiliate, complemento: value })
                }
                error={!!errors.complemento}
              />
              {errors.complemento && (
                <AffiliateErrorMessage>
                  {errors.complemento}
                </AffiliateErrorMessage>
              )}

              {/* Bairro */}
              <FloatingInput
                label="Bairro"
                value={affiliate.bairro}
                onChange={(value) =>
                  setAffiliate({ ...affiliate, bairro: value })
                }
                error={!!errors.bairro}
              />
              {errors.bairro && (
                <AffiliateErrorMessage>{errors.bairro}</AffiliateErrorMessage>
              )}

              {/* Cidade */}
              <FloatingInput
                label="Cidade"
                value={affiliate.cidade}
                onChange={(value) =>
                  setAffiliate({ ...affiliate, cidade: value })
                }
                error={!!errors.cidade}
              />
              {errors.cidade && (
                <AffiliateErrorMessage>{errors.cidade}</AffiliateErrorMessage>
              )}

              {/* UF */}
              <FloatingInput
                label="UF"
                value={affiliate.uf}
                onChange={(value) => setAffiliate({ ...affiliate, uf: value })}
                error={!!errors.uf}
                mask="AA"
              />
              {errors.uf && (
                <AffiliateErrorMessage>{errors.uf}</AffiliateErrorMessage>
              )}
            </>
          )}

          <AffiliateRadioInputWrapper>
            <IonText>Você produz ou revende?</IonText>
            <IonRadioGroup
              value={affiliate.tipo_atividade}
              onIonChange={(e) =>
                setAffiliate({ ...affiliate, tipo_atividade: e.detail.value })
              }
            >
              <AffiliateRadioInputContainer>
                <IonRadio value="produz" labelPlacement="end" color="dark">
                  Produzo
                </IonRadio>
                <IonRadio value="revende" labelPlacement="end" color="dark">
                  Revendo
                </IonRadio>
              </AffiliateRadioInputContainer>
            </IonRadioGroup>
          </AffiliateRadioInputWrapper>

          <AffiliateRadioInputWrapper>
            <IonText>
              Você topa enviar alguns produtos para a gente te conhecer melhor?
            </IonText>
            <IonRadioGroup
              value={affiliate.envio_produtos}
              onIonChange={(e) =>
                setAffiliate({ ...affiliate, envio_produtos: e.detail.value })
              }
            >
              <AffiliateRadioInputContainer direction="column">
                <IonRadio value="sim" color="dark">
                  Sim, posso enviar
                </IonRadio>
                <IonRadio value="nao" color="dark">
                  Prefiro não enviar
                </IonRadio>
                <IonRadio value="nao_trabalhamos_com_produtos" color="dark">
                  Não trabalhamos com produtos
                </IonRadio>
              </AffiliateRadioInputContainer>
            </IonRadioGroup>
          </AffiliateRadioInputWrapper>

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
