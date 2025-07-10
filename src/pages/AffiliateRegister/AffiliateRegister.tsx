import {
  IonContent,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonSelectOption,
  IonText,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  AffiliateButtonContainer,
  AffiliateContainer,
  AffiliateDataContainer,
  AffiliateErrorMessage,
  AffiliateRadioInputContainer,
  BaseDataContainer,
  CustomSelect,
  FormDataContainer,
  FormInputRow,
  InputLabelContainer,
  SearchCEPButton,
  TermsLink,
  TermsParagraph,
} from "./affiliateRegister.style";

import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import FloatingInput from "../../components/FloatingInput";

// Importa a função que criamos no auth-service
import { registerAffiliate } from "../../services/auth-service";

const AffiliateRegister: React.FC = () => {
  const history = useHistory();
  const [hasPhysicalAddress, setHasPhysicalAddress] = useState(false);
  const [hasCodeApproval, setHasCodeApproval] = useState(false);
  const [affiliate, setAffiliate] = useState({
    nome_completo: "",
    data_nascimento: "",
    telefone: "",
    email: "",

    nome_marca: "",
    categoria: "",

    cep: "",
    rua: "",
    numeroEndereco: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",

    instagram: "",
    site: "",

    password: "",
    password_confirmation: "",

    codigo_aprovacao: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // if (!affiliate.nome_fantasia) {
    //   newErrors.nome_fantasia = "Nome Fantasia é obrigatório";
    // }

    if (!affiliate.nome_marca) {
      newErrors.nome_marca = "Nome da Marca é obrigatório";
    }

    if (!affiliate.email) {
      newErrors.email = "Email é obrigatório";
    }
    // if (!affiliate.telefone) {
    //   newErrors.telefone = "Telefone é obrigatório";
    // }

    if (hasPhysicalAddress) {
      if (!affiliate.cep) newErrors.cep = "CEP é obrigatório";
      if (!affiliate.rua) newErrors.rua = "Rua é obrigatório";
      if (!affiliate.numeroEndereco)
        newErrors.numeroEndereco = "Número é obrigatório";
      if (!affiliate.bairro) newErrors.bairro = "Bairro é obrigatório";
      if (!affiliate.cidade) newErrors.cidade = "Cidade é obrigatório";
      if (!affiliate.uf) newErrors.uf = "UF é obrigatório";
    }

    if (!affiliate.instagram && !affiliate.site) {
      newErrors.site = "Insira pelo menos um site ou instagram.";
      newErrors.instagram = "Insira pelo menos um site ou instagram.";
    }

    setErrors(newErrors);
    console.log({});
    return Object.keys(newErrors).length === 0;
  };

  const handleAffiliateRegister = async () => {
    if (!validateForm()) return;

    try {
      await registerAffiliate({
        email: affiliate.email,
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
          <FormDataContainer>
            <BaseDataContainer>
              <FloatingInput
                label="Nome Completo"
                value={affiliate.nome_completo}
                onChange={(v) =>
                  setAffiliate({ ...affiliate, nome_completo: v })
                }
                error={!!errors.nome_completo}
              />
              {errors.nome_completo && (
                <AffiliateErrorMessage>
                  {errors.nome_completo}
                </AffiliateErrorMessage>
              )}

              <FloatingInput
                label="Data de Nascimento"
                value={affiliate.data_nascimento}
                onChange={(v) =>
                  setAffiliate({ ...affiliate, data_nascimento: v })
                }
                type="date"
                error={!!errors.data_nascimento}
              />
              {errors.data_nascimento && (
                <AffiliateErrorMessage>
                  {errors.data_nascimento}
                </AffiliateErrorMessage>
              )}

              <FloatingInput
                label="Telefone"
                value={affiliate.telefone}
                onChange={(v) => setAffiliate({ ...affiliate, telefone: v })}
                error={!!errors.telefone}
                mask="(99)99999-9999"
              />
              {errors.telefone && (
                <AffiliateErrorMessage>{errors.telefone}</AffiliateErrorMessage>
              )}

              <FloatingInput
                label="Email"
                value={affiliate.email}
                onChange={(v) => setAffiliate({ ...affiliate, email: v })}
                type="email"
                error={!!errors.email}
              />
              {errors.email && (
                <AffiliateErrorMessage>{errors.email}</AffiliateErrorMessage>
              )}
            </BaseDataContainer>

            <AffiliateDataContainer>
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
                <AffiliateErrorMessage>
                  {errors.nome_marca}
                </AffiliateErrorMessage>
              )}

              <InputLabelContainer>
                <IonText color="light">Selecione uma categoria</IonText>
                <CustomSelect
                  placeholder="Categoria"
                  value={affiliate.categoria}
                  fill="solid"
                  onIonChange={(e) =>
                    setAffiliate({ ...affiliate, categoria: e.detail.value })
                  }
                >
                  <IonSelectOption value="arte">Arte</IonSelectOption>
                  <IonSelectOption value="brecho">Brechó</IonSelectOption>
                  <IonSelectOption value="cosmeticos">
                    Cosméticos
                  </IonSelectOption>
                  <IonSelectOption value="cultura">Cultura</IonSelectOption>
                  <IonSelectOption value="decoracao">Decoração</IonSelectOption>
                  <IonSelectOption value="gastronomia">
                    Gastronomia
                  </IonSelectOption>
                  <IonSelectOption value="moda">Moda</IonSelectOption>
                  <IonSelectOption value="outros">Outros</IonSelectOption>
                </CustomSelect>
              </InputLabelContainer>

              <InputLabelContainer>
                <IonText color="light">Possui endereço físico?</IonText>
                <IonRadioGroup
                  color="light"
                  value={hasPhysicalAddress ? "true" : "false"}
                  onIonChange={(e) =>
                    setHasPhysicalAddress(e.detail.value === "true")
                  }
                >
                  <AffiliateRadioInputContainer>
                    <IonRadio color="light" value="true" labelPlacement="end">
                      Sim
                    </IonRadio>
                    <IonRadio color="light" value="false" labelPlacement="end">
                      Não
                    </IonRadio>
                  </AffiliateRadioInputContainer>
                </IonRadioGroup>
              </InputLabelContainer>

              {hasPhysicalAddress && (
                <>
                  <FormInputRow>
                    {/* CEP */}
                    <FloatingInput
                      label="CEP"
                      value={affiliate.cep}
                      onChange={(value) =>
                        setAffiliate({ ...affiliate, cep: value })
                      }
                      mask="99999-999"
                      error={!!errors.cep}
                    />
                    <SearchCEPButton strong size="small" shape="round">
                      BUSCAR
                    </SearchCEPButton>
                  </FormInputRow>
                  {errors.cep && (
                    <AffiliateErrorMessage>{errors.cep}</AffiliateErrorMessage>
                  )}

                  {/* Rua */}
                  <FloatingInput
                    label="Rua"
                    value={affiliate.rua}
                    onChange={(value) =>
                      setAffiliate({ ...affiliate, rua: value })
                    }
                    error={!!errors.rua}
                  />
                  {errors.rua && (
                    <AffiliateErrorMessage>{errors.rua}</AffiliateErrorMessage>
                  )}

                  <FormInputRow>
                    <>
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
                    </>
                    <>
                      {/* Complemento */}
                      <FloatingInput
                        label="Complemento"
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
                    </>
                  </FormInputRow>

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
                    <AffiliateErrorMessage>
                      {errors.bairro}
                    </AffiliateErrorMessage>
                  )}

                  <FormInputRow>
                    <>
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
                        <AffiliateErrorMessage>
                          {errors.cidade}
                        </AffiliateErrorMessage>
                      )}
                    </>
                    <>
                      {/* UF */}
                      <FloatingInput
                        label="UF"
                        value={affiliate.uf}
                        onChange={(value) =>
                          setAffiliate({ ...affiliate, uf: value })
                        }
                        error={!!errors.uf}
                        mask="AA"
                      />
                      {errors.uf && (
                        <AffiliateErrorMessage>
                          {errors.uf}
                        </AffiliateErrorMessage>
                      )}
                    </>
                  </FormInputRow>
                </>
              )}

              {/* Site */}
              <FloatingInput
                label="Site"
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

              {/* Instagram */}
              <FloatingInput
                label="Instagram"
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
                <AffiliateErrorMessage>
                  {errors.instagram}
                </AffiliateErrorMessage>
              )}
            </AffiliateDataContainer>

            <BaseDataContainer>
              <FloatingInput
                label="Senha"
                value={affiliate.password}
                onChange={(v) => setAffiliate({ ...affiliate, password: v })}
                isPassword
                error={!!errors.password}
              />
              {errors.password && (
                <AffiliateErrorMessage>{errors.password}</AffiliateErrorMessage>
              )}

              <FloatingInput
                label="Confirmar Senha"
                value={affiliate.password_confirmation}
                onChange={(v) =>
                  setAffiliate({ ...affiliate, password_confirmation: v })
                }
                isPassword
                error={!!errors.password_confirmation}
              />
              {errors.password_confirmation && (
                <AffiliateErrorMessage>
                  {errors.password_confirmation}
                </AffiliateErrorMessage>
              )}
            </BaseDataContainer>
          </FormDataContainer>

          <p style={{ marginTop: "16px", textAlign: "justify" }}>
            Ao enviar as informações, sua empresa será submetida a um processo
            seletivo para avaliar sua conformidade com as normas e valores. Caso
            possua um código de aprovação imediata fornecido pelo Administrador,
            insira-o no campo abaixo.
          </p>

          {/* Código de Pré-aprovação */}
          <FloatingInput
            label="Código de aprovação"
            value={affiliate.codigo_aprovacao}
            onChange={(value) =>
              setAffiliate({ ...affiliate, codigo_aprovacao: value })
            }
            error={!!errors.codigo_aprovacao}
          />

          <AffiliateButtonContainer>
            <Button onClick={handleAffiliateRegister} variant="secondary">
              {affiliate.codigo_aprovacao
                ? "CADASTRAR-SE"
                : "SOLICITAR APROVAÇÃO"}
            </Button>
          </AffiliateButtonContainer>
          {/* Mensagem de erro geral */}
          {Object.keys(errors).length > 0 && (
            <AffiliateErrorMessage style={{ marginBottom: "16px" }}>
              Por favor, corrija os campos acima para continuar.
            </AffiliateErrorMessage>
          )}

          <TermsParagraph>
            Ao entrar, você concorda com nossos
            <br />
            <TermsLink href="#oi">Termos e política de Privacidade</TermsLink>
          </TermsParagraph>
        </AffiliateContainer>
      </IonContent>
    </IonPage>
  );
};

export default AffiliateRegister;
