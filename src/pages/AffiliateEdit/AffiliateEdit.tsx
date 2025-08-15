/* ──────────────────────────────────────────────────────────────
 * Edição do primeiro afiliado vinculado ao token
 * ────────────────────────────────────────────────────────────── */
import {
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
import { fetchMyEstablishmentData } from "../../services/affiliateService";
import { updateEstablishment } from "../../services/auth-service";
import { CategoryService } from "../../services/category-service";
import { GeocodeService } from "../../services/geocode-service";
import { fetchCep } from "../../services/viacepService";
import { UpdateAffiliateEstablishmentRequest } from "../../types/api/affiliate";
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
} from "./AffiliateEdit.style";

/* ---------- estado (todos campos opcionais) ------------------- */

const AffiliateEdit: React.FC = () => {
  const history = useHistory();
  const [scrolled, setScrolled] = useState(false);

  const [shopPhotoFile, setShopPhotoFile] = useState<File | undefined>(
    undefined
  );
  const shopPhotoFileRef = useRef<HTMLInputElement>(null);
  const [shopPhotoUrl, setShopPhotoUrl] = useState<string>();

  const [productPhotoFile, setProductPhotoFile] = useState<File | undefined>(
    undefined
  );
  const productPhotoFileRef = useRef<HTMLInputElement>(null);
  const [productPhotoUrl, setProductPhotoUrl] = useState<string>();

  const [behindTheScenesPhotoFile, setBehindTheScenesPhotoFile] = useState<
    File | undefined
  >(undefined);
  const behindTheScenesFileRef = useRef<HTMLInputElement>(null);
  const [behindTheScenesPhotoUrl, setBehindTheScenesPhotoUrl] =
    useState<string>();

  const [hasPhysicalAddress, setHasPhysicalAddress] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const { user } = useAuthContext();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const establishment = user?.establishments[0];
  const initialForm: UpdateAffiliateEstablishmentRequest = {
    name: establishment?.name,
    legal_name: establishment?.legal_name || "",
    description: "",
    document_number: "",
    company_age: "",
    business_model: "",
    email: "",
    phone_number: "",
    whatsapp_number: "",
    category_id: undefined,
    address: {
      city: "",
      state: "",
      complement: "",
      zip_code: "",
      street: "",
      number: "",
      neighborhood: "",
    },
    instagram: "",
    site: "",
  };

  const [form, setForm] =
    useState<UpdateAffiliateEstablishmentRequest>(initialForm);

  const fetchCategories = async () => {
    const response = await CategoryService.getCategories();
    setCategories(response.data);
  };

  const fetchEstablishment = async () => {
    if (!user?.establishments[0]) return;

    const establishment = await fetchMyEstablishmentData(
      user?.establishments[0].id
    );

    const address = establishment?.addresses[0];

    setForm((prev) => ({
      ...prev,
      name: establishment?.name,
      legal_name: establishment?.legal_name,
      description: establishment.description,
      document_number: establishment.document_number,
      company_age: establishment.company_age,
      business_model: establishment.business_model,
      email: establishment.email,
      phone_number: establishment.phone_number,
      whatsapp_number: establishment.whatsapp_number,
      category_id:
        establishment.categories.length > 0
          ? establishment.categories[0].id
          : undefined,
      address: {
        ...form.address,
        type: "main",
        city: address.city,
        state: address.state,
        complement: address.complement,
        zip_code: address.zip_code,
        street: address.street,
        number: address.number,
        neighborhood: address.neighborhood,
      },
      instagram: establishment.social_links?.instagram || "",
      site: establishment.social_links?.site || "",
    }));

    // if (establishment?.addresses && establishment.addresses.length > 0) {
    //   setHasPhysicalAddress(true);
    // }

    setShopPhotoUrl(establishment.shop_photo_url);
    setProductPhotoUrl(establishment.product_photo_url);
    setBehindTheScenesPhotoUrl(establishment.behind_the_scenes_photo_url);
  };
  useEffect(() => {
    const load = async () => {
      await fetchCategories();
      await fetchEstablishment();
    };

    load();
  }, []);

  const onLogoClick = () => shopPhotoFileRef.current?.click();
  const onCoverPhotoClick = () => productPhotoFileRef.current?.click();
  const onGalleryClick = () => behindTheScenesFileRef.current?.click();

  const onLogoChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setShopPhotoFile(file);
    setShopPhotoUrl(URL.createObjectURL(file));
  };

  const onCoverPhotoChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProductPhotoFile(file);
    setProductPhotoUrl(URL.createObjectURL(file));
  };

  const onGalleryChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBehindTheScenesPhotoFile(file);
    setBehindTheScenesPhotoUrl(URL.createObjectURL(file));
  };

  const handleFetchCep = async () => {
    const zip_code = form.address?.zip_code;
    if (!zip_code) return;
    try {
      const res = await fetchCep(zip_code);
      if (res.cep) {
        setForm((prev) => ({
          ...prev,
          address: {
            ...form.address,
            zip_code: res.cep,
            street: res.logradouro,
            complement: res.complemento,
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
      !form.address.street ||
      !form.address.number ||
      !form.address.city ||
      !form.address.state
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

    let address = form.address;
    if (hasPhysicalAddress) {
      if (!form.address.street) newErrors.street = "Endereço é obrigatório";
      if (!form.address.number) newErrors.number = "Número é obrigatório";
      if (!form.address.city) newErrors.city = "Cidade é obrigatória";
      if (!form.address.state) newErrors.state = "Estado (UF) é obrigatório";
      if (!form.address.zip_code) newErrors.zip_code = "CEP é obrigatório";

      const coords = await fetchCoords();
      if (coords) {
        address = {
          ...form.address,
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
      }
    }

    let newData: UpdateAffiliateEstablishmentRequest = {
      ...form,
      address: { ...address, type: "main" },
      shop_photo: shopPhotoFile,
      product_photo: productPhotoFile,
      behind_the_scenes_photo: behindTheScenesPhotoFile,
    };

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

  console.log(errors);
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
    if (!establishment?.id) return;
    const validatedForm = await validateForm();
    if (!validatedForm) return;

    try {
      await updateEstablishment({ data: validatedForm, id: establishment.id });

      history.goBack();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  /* ─── UI ────────────────────────────────────────────────────── */
  return (
    <IonPage>
      <IonContent fullscreen style={{ "--background": "#ffffff" } as any}>
        {/* HEADER FIXO */}
        <AppHeader
          title="Editar Perfil Comercial"
          backgroundColor="#868950"
          textColor="#FFFFFF"
        />

        {/* ÁREA ROLÁVEL */}
        <ScrollArea
          onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 0)}
        >
          {/* FORMULÁRIO */}
          <Content>
            <GreenLabelTheme>
              <InputTextTheme>
                <EditContainer>
                  <TitleSection>Editar Perfil Comercial</TitleSection>

                  {/* ---- campos ---- */}
                  <FieldWrapper>
                    <label>Nome do Local</label>
                    <input
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </FieldWrapper>
                  <FieldWrapper>
                    <label>Celular | WhatsApp</label>
                    <InputMask
                      mask="(99)99999-9999"
                      maskChar={null}
                      value={form.whatsapp_number ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, whatsapp_number: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>E-mail</label>
                    <input
                      type="email"
                      value={form.email ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </FieldWrapper>
                  {/* 
                  <FieldWrapper>
                    <label>Horário de Funcionamento</label>
                    <input />
                  </FieldWrapper> */}

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
                            value={form.address.zip_code}
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
                          value={form.address.neighborhood}
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
                          value={form.address.street}
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
                          value={form.address.number}
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
                          value={form.address.complement}
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
                          value={form.address.city}
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
                          value={form.address.state}
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
                      value={form.category_id}
                      fill="solid"
                      onIonChange={(e) => {
                        setForm({ ...form, category_id: e.detail.value });
                      }}
                    >
                      {categories.map((category) => (
                        <IonSelectOption key={category.id} value={category.id}>
                          {category.name}
                        </IonSelectOption>
                      ))}
                    </CustomSelect>
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

                  <TextAreaWrapper>
                    <label>Descrição</label>
                    <textarea
                      rows={6}
                      value={form.description ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                    />
                  </TextAreaWrapper>

                  <FieldWrapper>
                    <label>Razão Social</label>
                    <input
                      value={form.legal_name}
                      onChange={(e) =>
                        setForm({ ...form, legal_name: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>CNPJ</label>
                    <InputMask
                      mask="99.999.999/9999-99"
                      value={form.document_number}
                      onChange={(e) =>
                        setForm({ ...form, document_number: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Tempo de Empresa</label>
                    <input
                      value={form.company_age}
                      onChange={(e) =>
                        setForm({ ...form, company_age: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Foto do Estabelecimento</label>
                    <UploadLogoColumn>
                      <input
                        type="file"
                        ref={productPhotoFileRef}
                        style={{ display: "none" }}
                        onChange={onCoverPhotoChange}
                      />
                      <p>
                        Anexe aqui uma foto que de sua loja ou estabeleciemento:
                      </p>
                      <UploadImageButton onClick={onCoverPhotoClick}>
                        <img
                          src={productPhotoUrl || "/assets/default-photo.png"}
                          alt="Foto da marca"
                        />
                      </UploadImageButton>
                    </UploadLogoColumn>
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Foto do Produto</label>
                    <UploadLogoColumn>
                      <input
                        type="file"
                        ref={shopPhotoFileRef}
                        style={{ display: "none" }}
                        onChange={onLogoChange}
                      />
                      <p>
                        Anexe aqui uma foto que de sua loja ou estabeleciemento:
                      </p>
                      <UploadImageButton onClick={onLogoClick}>
                        <img
                          src={shopPhotoUrl || "/assets/default-photo.png"}
                          alt="Foto da marca"
                        />
                      </UploadImageButton>
                    </UploadLogoColumn>
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Foto dos Bastidores</label>
                    <UploadLogoColumn>
                      <input
                        type="file"
                        ref={behindTheScenesFileRef}
                        style={{ display: "none" }}
                        onChange={onGalleryChange}
                      />
                      <p>
                        Anexe aqui uma foto de quem criou e fez a marca
                        acontecer! Adoramos ver os bastidores:
                      </p>
                      <UploadPersonPhotoButton onClick={onGalleryClick}>
                        <img
                          src={
                            behindTheScenesPhotoUrl ||
                            "/assets/default-photo.png"
                          }
                          alt="Foto da marca"
                        />
                      </UploadPersonPhotoButton>
                    </UploadLogoColumn>
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

export default AffiliateEdit;
