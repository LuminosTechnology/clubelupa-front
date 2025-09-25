import {
  IonContent,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonSelectOption,
  IonText,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
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
  FormInputColumns,
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
import { CategoryService } from "../../services/category-service";
import { GeocodeService } from "../../services/geocode-service";
import { fetchCep } from "../../services/viacepService";
import { RegisterAffiliateRequest } from "../../types/api/affiliate";
import { Category } from "../../types/api/category";
import { validateBirthDate } from "../../utils/validate-birth-date";

const AffiliateRegister: React.FC = () => {
  const history = useHistory();
  const [hasPhysicalAddress, setHasPhysicalAddress] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [affiliate, setAffiliate] = useState<RegisterAffiliateRequest>({
    name: "",
    email: "",
    birth_date: "",
    password: "",
    password_confirmation: "",
    phone_number: "",
    establishment_name: "",
    category_id: 0,
    instagram: "",
    site: "https://",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!affiliate.name) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!affiliate.email) {
      newErrors.email = "Email é obrigatório";
    }

    if (!affiliate.birth_date) {
      newErrors.birth_date = "Data de nascimento é obrigatória";
    }

    const birthDateError = validateBirthDate(affiliate.birth_date);
    if (birthDateError) newErrors.birth_date = birthDateError;

    const birthDate = new Date(affiliate.birth_date);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const hasHadBirthdayThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDay() >= birthDate.getDay());

    if (!hasHadBirthdayThisYear) {
      age--;
    }

    if (age < 18) {
      newErrors.birth_date = "Você precisa ter 18 anos para se cadastrar";
    }

    if (!affiliate.password) {
      newErrors.password = "Senha é obrigatória";
    }

    if (affiliate.password !== affiliate.password_confirmation) {
      newErrors.password_confirmation = "As senhas não coincidem";
    }

    if (!affiliate.establishment_name) {
      newErrors.establishment_name = "Nome do estabelecimento é obrigatório";
    }

    if (!affiliate.phone_number) {
      newErrors.phone_number = "Telefone é obrigatório";
    }

    if (!affiliate.category_id) {
      newErrors.category_id = "Categoria é obrigatória";
    }

    if (!affiliate.instagram && !affiliate.site) {
      newErrors.instagram = "Informe o Instagram ou site";
      newErrors.site = "Informe o site ou Instagram";
    }

    if (hasPhysicalAddress && affiliate.address) {
      const addr = affiliate.address;

      if (!addr.zip_code) newErrors.zip_code = "CEP é obrigatório";
      if (!addr.street) newErrors.street = "Rua é obrigatória";
      if (!addr.number) newErrors.number = "Número é obrigatório";
      if (!addr.neighborhood) newErrors.neighborhood = "Bairro é obrigatório";
      if (!addr.city) newErrors.city = "Cidade é obrigatória";
      if (!addr.state) newErrors.state = "Estado (UF) é obrigatório";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleFetchCep = async () => {
    if (!affiliate.address) return;
    if (!affiliate.address.zip_code) return;
    const cleanedZipCode = affiliate.address.zip_code.replace(/\D/g, "");
    if (cleanedZipCode.length !== 8) return;

    const response = await fetchCep(cleanedZipCode);
    if (response.cep) {
      setAffiliate({
        ...affiliate,
        address: {
          ...affiliate.address,
          zip_code: response.cep,
          street: response.logradouro,
          // complement: response.complemento,
          neighborhood: response.bairro,
          city: response.localidade,
          state: response.uf,
        },
      });
      setErrors({});
    } else {
      setErrors({
        street: "Não foi possível encontrar o CEP informado.",
      });
    }
  };

  const fetchCoords = async () => {
    if (
      !affiliate.address ||
      !affiliate.address.street ||
      !affiliate.address.number ||
      !affiliate.address.city ||
      !affiliate.address.state
    )
      return;
    console.log("Tried to fetch coords");
    try {
      const coords = await GeocodeService.getCoordsByAddress({
        street: affiliate.address.street,
        number: affiliate.address.number,
        city: affiliate.address.city,
        state: affiliate.address.state,
      });

      return coords;
    } catch (e) {
      console.error(e);
      setErrors({
        street:
          "Não foi possível encontrar coordenadas para o endereço informado. Por favor, verifique se o endereço está correto. Ou tente novamente mais tarde.",
      });
    }
  };

  const handleAffiliateRegister = async () => {
    if (!validateForm()) return;

    try {
      if (hasPhysicalAddress) {
        const coords = await fetchCoords();
        if (!coords) throw new Error("Coords not found");
        await registerAffiliate({
          ...affiliate,
          address: {
            ...affiliate.address,
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
        });
      } else {
        await registerAffiliate({
          ...affiliate,
        });
      }

      // Se deu tudo certo, vamos para a tela de sucesso
      history.push("/register/verify-email", {
        email: affiliate.email,
        nextPage: affiliate.auto_approve_code //TODO: Implementar verificação de código de aprovação, se correto redirecionar para a tela de approved, senão para pending
          ? "/register/affiliate/approved/success"
          : "/register/affiliate/pending/success",
      });

      resetForm();
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

  const formatSite = (value: string) => {
    let clean = value;
    if (!value.startsWith("https://")) {
      clean = "https://" + value.replace(/^https?:\/\//, "");
    }
    return clean;
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

  const resetForm = () => {
    setAffiliate({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone_number: "",
      establishment_name: "",
      category_id: 0,
      instagram: "",
      site: "https://",
      birth_date: "",
      address: {
        zip_code: "",
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        complement: "",
      },
    });

    setErrors({});
    setHasPhysicalAddress(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await CategoryService.getCategories();
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  return (
    <IonPage>
      <IonContent style={{ "--background": "#E6C178" }}>
        <AffiliateContainer>
          <BackButton />
          <h2>Cadastre-se para ser um afiliado</h2>
          <FormDataContainer>
            <BaseDataContainer>
              <FloatingInput
                label="Nome Completo"
                value={affiliate.name}
                onChange={(v) => setAffiliate({ ...affiliate, name: v })}
                error={!!errors.name}
              />
              {errors.name && (
                <AffiliateErrorMessage>{errors.name}</AffiliateErrorMessage>
              )}

              <FloatingInput
                label="Data de Nascimento"
                value={affiliate.birth_date}
                onChange={(v) => setAffiliate({ ...affiliate, birth_date: v })}
                mask="99/99/9999"
                inputMode="numeric"
                error={!!errors.birth_date}
              />
              {errors.birth_date && (
                <AffiliateErrorMessage>
                  {errors.birth_date}
                </AffiliateErrorMessage>
              )}

              <FloatingInput
                label="Telefone"
                value={affiliate.phone_number}
                inputMode="numeric"
                onChange={(v) =>
                  setAffiliate({ ...affiliate, phone_number: v })
                }
                error={!!errors.phone_number}
                mask="(99)99999-9999"
              />
              {errors.phone_number && (
                <AffiliateErrorMessage>
                  {errors.phone_number}
                </AffiliateErrorMessage>
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
                value={affiliate.establishment_name}
                onChange={(value) =>
                  setAffiliate({ ...affiliate, establishment_name: value })
                }
                error={!!errors.establishment_name}
              />
              {errors.establishment_name && (
                <AffiliateErrorMessage>
                  {errors.establishment_name}
                </AffiliateErrorMessage>
              )}

              <InputLabelContainer>
                <IonText color="light">Selecione uma categoria</IonText>
                <CustomSelect
                  placeholder="Categoria"
                  value={affiliate.category_id}
                  fill="solid"
                  onIonChange={(e) =>
                    setAffiliate({ ...affiliate, category_id: e.detail.value })
                  }
                >
                  {categories.map((category) => (
                    <IonSelectOption key={category.id} value={category.id}>
                      {category.name}
                    </IonSelectOption>
                  ))}
                </CustomSelect>
                {errors.category_id && (
                  <AffiliateErrorMessage>
                    {errors.category_id}
                  </AffiliateErrorMessage>
                )}
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
                      value={affiliate?.address?.zip_code || ""}
                      onChange={(value) =>
                        setAffiliate({
                          ...affiliate,
                          address: {
                            ...affiliate.address,
                            zip_code: value,
                          },
                        })
                      }
                      mask="99999-999"
                      error={!!errors.cep}
                    />
                    <SearchCEPButton
                      strong
                      size="small"
                      shape="round"
                      onClick={handleFetchCep}
                    >
                      BUSCAR
                    </SearchCEPButton>
                  </FormInputRow>
                  {errors.cep && (
                    <AffiliateErrorMessage>{errors.cep}</AffiliateErrorMessage>
                  )}

                  {/* Rua */}
                  <FloatingInput
                    label="Rua"
                    value={affiliate?.address?.street || ""}
                    onChange={(value) =>
                      setAffiliate({
                        ...affiliate,
                        address: { ...affiliate.address, street: value },
                      })
                    }
                    error={!!errors.street}
                  />
                  {errors.street && (
                    <AffiliateErrorMessage>
                      {errors.street}
                    </AffiliateErrorMessage>
                  )}

                  <FormInputRow>
                    <FormInputColumns>
                      {/* Numero */}
                      <FloatingInput
                        label="Número"
                        value={affiliate?.address?.number || ""}
                        onChange={(value) =>
                          setAffiliate({
                            ...affiliate,
                            address: { ...affiliate.address, number: value },
                          })
                        }
                        error={!!errors.number}
                        type="number"
                      />
                      {errors.number && (
                        <AffiliateErrorMessage>
                          {errors.number}
                        </AffiliateErrorMessage>
                      )}
                    </FormInputColumns>
                    <FormInputColumns>
                      {/* Complemento */}
                      <FloatingInput
                        label="Complemento"
                        value={affiliate?.address?.complement || ""}
                        onChange={(value) =>
                          setAffiliate({
                            ...affiliate,
                            address: {
                              ...affiliate.address,
                              complement: value,
                            },
                          })
                        }
                        error={!!errors.complement}
                      />
                      {errors.complement && (
                        <AffiliateErrorMessage>
                          {errors.complement}
                        </AffiliateErrorMessage>
                      )}
                    </FormInputColumns>
                  </FormInputRow>

                  {/* Bairro */}
                  <FloatingInput
                    label="Bairro"
                    value={affiliate?.address?.neighborhood || ""}
                    onChange={(value) =>
                      setAffiliate({
                        ...affiliate,
                        address: {
                          ...affiliate.address,
                          neighborhood: value,
                        },
                      })
                    }
                    error={!!errors.neighborhood}
                  />
                  {errors.neighborhood && (
                    <AffiliateErrorMessage>
                      {errors.neighborhood}
                    </AffiliateErrorMessage>
                  )}

                  <FormInputRow>
                    <>
                      {/* Cidade */}
                      <FloatingInput
                        label="Cidade"
                        value={affiliate?.address?.city || ""}
                        onChange={(value) =>
                          setAffiliate({
                            ...affiliate,
                            address: {
                              ...affiliate.address,
                              city: value,
                            },
                          })
                        }
                        error={!!errors.city}
                      />
                      {errors.city && (
                        <AffiliateErrorMessage>
                          {errors.city}
                        </AffiliateErrorMessage>
                      )}
                    </>
                    <>
                      {/* UF */}
                      <FloatingInput
                        label="UF"
                        value={affiliate?.address?.state || ""}
                        onChange={(value) =>
                          setAffiliate({
                            ...affiliate,
                            address: {
                              ...affiliate.address,
                              state: value,
                            },
                          })
                        }
                        error={!!errors.state}
                      />
                      {errors.state && (
                        <AffiliateErrorMessage>
                          {errors.state}
                        </AffiliateErrorMessage>
                      )}
                    </>
                  </FormInputRow>
                </>
              )}

              {/* Site */}
              <FloatingInput
                label="Site"
                value={affiliate.site || ""}
                onChange={(value) =>
                  setAffiliate({
                    ...affiliate,
                    site: formatSite(value),
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
            value={affiliate.auto_approve_code || ""}
            onChange={(value) =>
              setAffiliate({ ...affiliate, auto_approve_code: value })
            }
            error={!!errors.auto_approve_code}
          />

          <AffiliateButtonContainer>
            <Button onClick={handleAffiliateRegister} variant="secondary">
              {affiliate.auto_approve_code
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
            <div>
              <TermsLink
                onClick={() =>
                  window.open("https://app.clubelupa.com.br/termos-e-condicoes", "_blank", "noopener")
                }
              >
                Termos
              </TermsLink>
              &nbsp;e&nbsp;
              <TermsLink
                onClick={() =>
                  window.open("https://app.clubelupa.com.br/politica-de-privacidade", "_blank", "noopener")
                }
              >
                política de privacidade
              </TermsLink> 
            </div>               
          </TermsParagraph>
        </AffiliateContainer>
      </IonContent>
    </IonPage>
  );
};

export default AffiliateRegister;
