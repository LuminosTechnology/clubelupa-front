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
import { useAuthContext } from "../../contexts/AuthContext";
import { fetchMyEstablishmentData } from "../../services/affiliateService";
import { updateEstablishment } from "../../services/auth-service";
import { CategoryService } from "../../services/category-service";
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
  EditOverlay,
  FieldWrapper,
  GreenLabelTheme,
  InputTextTheme,
  PhotoContainer,
  ProfilePhoto,
  ProfileWrapper,
  SalvarButton,
  SaveButtonWrapper,
  TextAreaWrapper,
  TitleSection,
  UploadImageButton,
  UploadLogoColumn,
  UploadPersonPhotoButton,
} from "./AffiliateEdit.style";
import { GeocodeService } from "../../services/geocode-service";

/* ---------- estado (todos campos opcionais) ------------------- */

const AffiliateEdit: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  const [logoFile, setLogoFile] = useState<File | undefined>(undefined);
  const logoFileRef = useRef<HTMLInputElement>(null);
  const [logoUrl, setLogoUrl] = useState<string>();

  const [coverPhotoFile, setCoverPhotoFile] = useState<File | undefined>(
    undefined
  );
  const coverPhotoFileRef = useRef<HTMLInputElement>(null);
  const [coverPhotoUrl, setCoverPhotoUrl] = useState<string>();

  const [galleryFile, setGalleryFile] = useState<File | undefined>(undefined);
  const galleryFileRef = useRef<HTMLInputElement>(null);
  const [galleryUrl, setGalleryUrl] = useState<string>();

  const [hasPhysicalAddress, setHasPhysicalAddress] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { user } = useAuthContext();

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

  useEffect(() => {
    const fetchEstablishment = async () => {
      if (!user?.establishments[0]) return;
      const establishment = await fetchMyEstablishmentData(
        user?.establishments[0].id
      );
      console.log({ establishment });

      setForm({
        ...form,
        name: establishment?.name,
        legal_name: establishment?.legal_name,
        description: establishment.description,
        document_number: establishment.document_number,
        company_age: establishment.company_age,
        business_model: establishment.business_model,
        email: establishment.email,
        phone_number: establishment.phone_number,
        whatsapp_number: establishment.whatsapp_number,
        category_id: establishment.categories
          ? establishment.categories[0].id
          : undefined,
        address: {
          type: "main",
          city: establishment.addresses[0].city,
          state: establishment.addresses[0].state,
          complement: establishment.addresses[0].complement,
          zip_code: establishment.addresses[0].zip_code,
          street: establishment.addresses[0].street,
          number: establishment.addresses[0].number,
          neighborhood: establishment.addresses[0].neighborhood,
        },
        instagram: establishment.social_links.instagram,
        site: establishment.social_links.site,
      });

      if (establishment?.addresses && establishment.addresses.length > 0) {
        setHasPhysicalAddress(true);
      }

      setLogoUrl(establishment.logo_url);
      setCoverPhotoUrl(establishment.cover_photo_url);
      setGalleryUrl(establishment.gallery_urls[0].url);
    };

    fetchEstablishment();
  }, []);

  const onLogoClick = () => logoFileRef.current?.click();
  const onCoverPhotoClick = () => coverPhotoFileRef.current?.click();
  const onGalleryClick = () => galleryFileRef.current?.click();

  const onLogoChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoUrl(URL.createObjectURL(file));
  };

  const onCoverPhotoChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverPhotoFile(file);
    setCoverPhotoUrl(URL.createObjectURL(file));
  };

  const onGalleryChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setGalleryFile(file);
    setGalleryUrl(URL.createObjectURL(file));
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

  const handleSave = async () => {
    if (!establishment?.id) return;

    let address = form.address;
    if (hasPhysicalAddress) {
      const coords = await fetchCoords();
      if (!coords) throw new Error("Coords not found");
      address = {
        ...form.address,
        latitude: coords.latitude,
        longitude: coords.longitude,
      };
    }
    console.log({ address });

    const data = {
      ...form,
      address,
      logo: logoFile,
      cover_photo: coverPhotoFile,
      gallery: galleryFile,
    };

    console.log(data);
    await updateEstablishment({ id: establishment.id, data });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await CategoryService.getCategories();
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

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
                    </>
                  )}

                  <FieldWrapper>
                    <label>Categoria Principal</label>
                    <CustomSelect
                      placeholder="Categoria"
                      value={form.category_id}
                      fill="solid"
                      onIonChange={(e) => {}}
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
                    <input
                      value={form.instagram}
                      onChange={(e) =>
                        setForm({ ...form, instagram: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Site</label>
                    <input
                      type="url"
                      value={form.site}
                      onChange={(e) =>
                        setForm({ ...form, site: e.target.value })
                      }
                    />
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
                        ref={coverPhotoFileRef}
                        style={{ display: "none" }}
                        onChange={onCoverPhotoChange}
                      />
                      <p>
                        Anexe aqui uma foto que de sua loja ou estabeleciemento:
                      </p>
                      <UploadImageButton onClick={onCoverPhotoClick}>
                        <img
                          src={coverPhotoUrl || "/assets/default-photo.png"}
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
                        ref={logoFileRef}
                        style={{ display: "none" }}
                        onChange={onLogoChange}
                      />
                      <p>
                        Anexe aqui uma foto que de sua loja ou estabeleciemento:
                      </p>
                      <UploadImageButton onClick={onLogoClick}>
                        <img
                          src={logoUrl || "/assets/default-photo.png"}
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
                        ref={galleryFileRef}
                        style={{ display: "none" }}
                        onChange={onGalleryChange}
                      />
                      <p>
                        Anexe aqui uma foto de quem criou e fez a marca
                        acontecer! Adoramos ver os bastidores:
                      </p>
                      <UploadPersonPhotoButton onClick={onGalleryClick}>
                        <img
                          src={galleryUrl || "/assets/default-photo.png"}
                          alt="Foto da marca"
                        />
                      </UploadPersonPhotoButton>
                    </UploadLogoColumn>
                  </FieldWrapper>

                  <SaveButtonWrapper>
                    <SalvarButton onClick={handleSave}>SALVAR</SalvarButton>
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
