/* ──────────────────────────────────────────────────────────────
 * Edição do primeiro afiliado vinculado ao token
 * ────────────────────────────────────────────────────────────── */
import {
  IonAlert,
  IonContent,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonSelectOption,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";

import ScrollArea from "../../components/ScrollArea/ScrollArea";
import AppHeader from "../../components/SimpleHeader";

import InputMask from "react-input-mask";
import { useHistory } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext";
import { CategoryService } from "../../services/category-service";
import { GeocodeService } from "../../services/geocode-service";
import { fetchCep } from "../../services/viacepService";
import {
  BecomeAnAffiliateRequest,
  UpdateAffiliateEstablishmentRequest,
} from "../../types/api/affiliate";
import { Category } from "../../types/api/category";
import {
  AffiliateUpdateRadioContainer,
  BuscarButton,
  CepRow,
  Content,
  CustomSelect,
  EditContainer,
  ErrorMessage,
  FieldWrapper,
  GreenLabelTheme,
  InputTextTheme,
  SalvarButton,
  SaveButtonWrapper,
  SiteContainer,
  TextAreaWrapper,
  TitleSection,
  UploadImageButton,
  UploadLogoColumn,
  UploadPersonPhotoButton,
} from "./AffiliateBecome.style";
import { becomeAnAffiliate } from "../../services/affiliateService";

/* ---------- estado (todos campos opcionais) ------------------- */

const AffiliateBecome: React.FC = () => {
  const history = useHistory();

  const [hasPhysicalAddress, setHasPhysicalAddress] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const initialForm: BecomeAnAffiliateRequest = {
    name: "",
    categories: [],
    instagram: "",
    site: "",
  };

  const [form, setForm] = useState<BecomeAnAffiliateRequest>(initialForm);

  const fetchCategories = async () => {
    const response = await CategoryService.getCategories();
    setCategories(response.data);
  };

  useEffect(() => {
    const load = async () => {
      await fetchCategories();
    };

    load();
  }, []);

  const handleFetchCep = async () => {
    const zip_code = form.address?.zip_code;
    if (!zip_code) return;
    try {
      const res = await fetchCep(zip_code);
      if (res.cep) {
        setForm((prev) => ({
          ...prev,
          address: {
            ...prev?.address,
            zip_code: res.cep,
            street: res.logradouro,
            // complement: res.complemento,
            neighborhood: res.bairro,
            city: res.localidade,
            state: res.uf,
          },
        }));
      }
    } catch (e) {
      console.error("[AffiliateEdit] CEP:", e);
    }
  };

  const fetchCoords = async () => {
    if (
      !form.address?.street ||
      !form.address?.number ||
      !form.address?.city ||
      !form.address?.state
    )
      return;
    try {
      const coords = await GeocodeService.getCoordsByAddress({
        street: form.address.street,
        number: form.address.number,
        city: form.address.city,
        state: form.address.state,
      });

      return coords;
    } catch (e) {
      console.error(e);
    }
  };

  const validateForm = async () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.name) newErrors.name = "Nome é obrigatório";

    if (!form.categories.length)
      newErrors.categories = "Categoria é obrigatória";

    let address = form.address;
    if (hasPhysicalAddress) {
      if (!form.address?.street) newErrors.street = "Endereço é obrigatório";
      if (!form.address?.number) newErrors.number = "Número é obrigatório";
      if (!form.address?.city) newErrors.city = "Cidade é obrigatória";
      if (!form.address?.state) newErrors.state = "Estado (UF) é obrigatório";
      if (!form.address?.zip_code) newErrors.zip_code = "CEP é obrigatório";

      const coords = await fetchCoords();
      if (coords) {
        address = {
          ...form.address,
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
      }
    }

    let newData: BecomeAnAffiliateRequest = hasPhysicalAddress
      ? {
          ...form,
          address,
        }
      : form;

    if (newData.site && newData.site?.trim().length > 0) {
      try {
        newData.site = formatWebsite(newData.site);
      } catch (error) {
        console.error(error);
      }
    }

    const trimmedInstagram = newData.instagram?.trim();
    const trimmedSite = newData.site?.trim();

    const hasNoInstagram = !trimmedInstagram || trimmedInstagram.length === 0;
    const hasNoSite = !trimmedSite || trimmedSite.length === 0;

    if (hasNoInstagram && hasNoSite) {
      newErrors.instagram = "Informe o Instagram ou site";
      newErrors.site = "Informe o site ou Instagram";
    }

    setErrors(newErrors);

    setForm(newData);
    if (Object.keys(newErrors).length > 0) {
      console.log({ newErrors });
      setIsLoading(false);
      return false;
    }
    return newData;
  };

  const formatWebsite = (value: string) => {
    let trimmed = value.trim();

    // Se não tiver protocolo, adiciona https://
    if (!/^https?:\/\//i.test(trimmed)) {
      trimmed = "https://" + trimmed.replace(/^www\./i, "");
    }

    try {
      const parsed = new URL(trimmed);
      return parsed.href; // retorna sempre com protocolo + domínio
    } catch (error) {
      return value; // se for inválida, mantém como está (para feedback de erro)
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    const validatedForm = await validateForm();
    if (!validatedForm) return;

    try {
      await becomeAnAffiliate(validatedForm);
      setIsSuccess(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage>
      <IonAlert
        isOpen={isSuccess}
        title="Sucesso"
        message="Perfil atualizado com sucesso!"
        buttons={["OK"]}
        onDidDismiss={() => history.replace("/affiliate/paywall")}
      />
      <IonContent fullscreen style={{ "--background": "#ffffff" } as any}>
        <AppHeader
          title="Editar Perfil Comercial"
          backgroundColor="#868950"
          textColor="#FFFFFF"
        />
        <ScrollArea>
          <Content>
            <GreenLabelTheme>
              <InputTextTheme>
                <EditContainer>
                  <TitleSection>
                    Torne-se um Afiliado do Clube Lupa
                  </TitleSection>

                  {/* ---- campos ---- */}
                  <FieldWrapper>
                    <label>Nome do Local</label>
                    <input
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                    {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Possui endereço físico?</label>
                    <IonRadioGroup
                      value={hasPhysicalAddress}
                      onIonChange={(e) => setHasPhysicalAddress(e.detail.value)}
                    >
                      <AffiliateUpdateRadioContainer>
                        <IonRadio value={true} labelPlacement="end">
                          Sim
                        </IonRadio>
                        <IonRadio value={false} labelPlacement="end">
                          Não
                        </IonRadio>
                      </AffiliateUpdateRadioContainer>
                    </IonRadioGroup>
                  </FieldWrapper>

                  {hasPhysicalAddress && (
                    <>
                      {/* CEP + buscar */}
                      <CepRow>
                        <FieldWrapper style={{ flex: 1 }}>
                          <label>CEP</label>
                          <InputMask
                            mask="99999-999"
                            maskChar={null}
                            value={form.address?.zip_code}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                address: {
                                  ...form.address,
                                  zip_code: e.target.value,
                                },
                              })
                            }
                          />
                        </FieldWrapper>
                        <BuscarButton onClick={handleFetchCep}>
                          BUSCAR
                        </BuscarButton>
                      </CepRow>

                      <FieldWrapper>
                        <label>Bairro</label>
                        <input
                          value={form.address?.neighborhood}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              address: {
                                ...form.address,
                                neighborhood: e.target.value,
                              },
                            })
                          }
                        />
                      </FieldWrapper>

                      <FieldWrapper>
                        <label>Rua</label>
                        <input
                          value={form.address?.street}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              address: {
                                ...form.address,
                                street: e.target.value,
                              },
                            })
                          }
                        />
                        {errors.street && (
                          <ErrorMessage>{errors.street}</ErrorMessage>
                        )}
                      </FieldWrapper>

                      <FieldWrapper>
                        <label>Número</label>
                        <input
                          value={form.address?.number}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              address: {
                                ...form.address,
                                number: e.target.value,
                              },
                            })
                          }
                        />
                        {errors.number && (
                          <ErrorMessage>{errors.number}</ErrorMessage>
                        )}
                      </FieldWrapper>

                      <FieldWrapper>
                        <label>Complemento</label>
                        <input
                          value={form.address?.complement}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              address: {
                                ...form.address,
                                complement: e.target.value,
                              },
                            })
                          }
                        />
                      </FieldWrapper>

                      <FieldWrapper>
                        <label>Cidade</label>
                        <input
                          value={form.address?.city}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              address: {
                                ...form.address,
                                city: e.target.value,
                              },
                            })
                          }
                        />
                        {errors.city && (
                          <ErrorMessage>{errors.city}</ErrorMessage>
                        )}
                      </FieldWrapper>

                      <FieldWrapper>
                        <label>UF</label>
                        <input
                          maxLength={2}
                          value={form.address?.state}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              address: {
                                ...form.address,
                                state: e.target.value,
                              },
                            })
                          }
                        />
                      </FieldWrapper>
                      {errors.state && (
                        <ErrorMessage>{errors.state}</ErrorMessage>
                      )}
                    </>
                  )}

                  <FieldWrapper>
                    <label>Categoria Principal</label>
                    <CustomSelect
                      placeholder="Categoria"
                      value={form.categories[0]}
                      fill="solid"
                      onIonChange={(e) => {
                        setForm({ ...form, categories: [e.detail.value] });
                      }}
                    >
                      {categories.map((category) => (
                        <IonSelectOption key={category.id} value={category.id}>
                          {category.name}
                        </IonSelectOption>
                      ))}
                    </CustomSelect>
                    {errors.categories && (
                      <ErrorMessage>{errors.categories}</ErrorMessage>
                    )}
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Instagram</label>
                    <SiteContainer>
                      <p>@</p>
                      <input
                        value={form.instagram}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            instagram: e.target.value,
                          })
                        }
                      />
                    </SiteContainer>
                    {errors.instagram && (
                      <ErrorMessage>{errors.instagram}</ErrorMessage>
                    )}
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Site</label>
                    <input
                      type="url"
                      value={form.site}
                      placeholder="exemplo.com"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          site: e.target.value,
                        })
                      }
                    />
                    {errors.site && <ErrorMessage>{errors.site}</ErrorMessage>}
                  </FieldWrapper>

                  {Object.keys(errors).length > 0 && (
                    <ErrorMessage style={{ marginBottom: "16px" }}>
                      Por favor, corrija os campos acima para continuar.
                    </ErrorMessage>
                  )}

                  <SaveButtonWrapper>
                    <SalvarButton onClick={handleSave} disabled={isLoading}>
                      {isLoading ? "SALVANDO..." : "SALVAR"}{" "}
                    </SalvarButton>
                  </SaveButtonWrapper>
                </EditContainer>
              </InputTextTheme>
            </GreenLabelTheme>
          </Content>
        </ScrollArea>
      </IonContent>
    </IonPage>
  );
};

export default AffiliateBecome;
