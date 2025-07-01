/* ──────────────────────────────────────────────────────────────
 * Edição do primeiro afiliado vinculado ao token
 * ────────────────────────────────────────────────────────────── */
import React, { useEffect, useRef, useState } from "react";
import { IonPage, IonContent, IonSpinner } from "@ionic/react";
import { useHistory } from "react-router-dom";

import AppHeader from "../../components/SimpleHeader";
import ScrollArea from "../../components/ScrollArea/ScrollArea";
import profilePlaceholder from "../../assets/profile-pic.svg";

import {
  Content,
  ProfileWrapper,
  PhotoContainer,
  ProfilePhoto,
  EditOverlay,
  EditContainer,
  TitleSection,
  FieldWrapper,
  TextAreaWrapper,
  CepRow,
  BuscarButton,
  SaveButtonWrapper,
  GreenLabelTheme,
  InputTextTheme,
  SalvarButton,
} from "./AffiliateEdit.style";

import { AffiliateData } from "../../services/interfaces/Affiliate";
import {
  getMyFirstAffiliate,
  updateAffiliate,
  uploadAffiliatePhoto,
} from "../../services/affiliateService";

/* ---------- estado (todos campos opcionais) ------------------- */
type FormState = Partial<AffiliateData> & {
  benefits?: string;
};

const emptyForm: FormState = {
  nome_local: "",
  celular: "",
  horario_funcionamento: "",
  email: "",
  cep: "",
  bairro: "",
  rua: "",
  cidade: "",
  uf: "",
  categoria: "",
  demais_categorias: "",
  instagram: "",
  site: "",
  benefits: "",
};

const AffiliateEdit: React.FC = () => {
  const history = useHistory();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  const [affiliateId, setAffiliateId] = useState<number | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState(profilePlaceholder);
  const [form, setForm] = useState<FormState>(emptyForm);

  /* ─── fetch inicial ─────────────────────────────────────────── */
  useEffect(() => {
    (async () => {
      try {
        const data = await getMyFirstAffiliate();
        if (!data) {
          history.goBack();
          return;
        }

        setAffiliateId(data.id);
        setForm({ ...emptyForm, ...data, benefits: data.benefits ?? "" });

        if (data.foto_perfil || data.profile_photo) {
          setPhotoUrl(data.foto_perfil ?? data.profile_photo);
        }
      } catch (err) {
        console.error("[AffiliateEdit] Erro:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [history]);

  /* ─── handlers ──────────────────────────────────────────────── */
  const onEditPhotoClick = () => fileInputRef.current?.click();

  const handlePhotoChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoUrl(URL.createObjectURL(file));
  };

  const handleCepBuscar = async () => {
    if (!form.cep) return;
    try {
      const res = await fetch(
        `https://viacep.com.br/ws/${form.cep.replace(/\D/g, "")}/json/`
      );
      const data = await res.json();
      if (!data.erro) {
        setForm((prev) => ({
          ...prev,
          bairro: data.bairro,
          rua: data.logradouro,
          cidade: data.localidade,
          uf: data.uf,
        }));
      }
    } catch (e) {
      console.error("[AffiliateEdit] CEP:", e);
    }
  };

  const handleSave = async () => {
    if (!affiliateId) return;
    try {
      if (photoFile) await uploadAffiliatePhoto(affiliateId, photoFile);

      await updateAffiliate(affiliateId, form as AffiliateData);
      history.goBack();
    } catch (e) {
      console.error("[AffiliateEdit] Salvar:", e);
    }
  };

  /* ─── loading ──────────────────────────────────────────────── */
  if (loading) {
    return (
      <IonPage>
        <AppHeader
          title="Editar Perfil Comercial"
          backgroundColor="#868950"
          textColor="#FFF"
        />
        <IonContent fullscreen>
          <IonSpinner name="crescent" />
        </IonContent>
      </IonPage>
    );
  }

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
        <ScrollArea onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 0)}>
          {/* FOTO */}
          <ProfileWrapper scrolled={scrolled}>
            <PhotoContainer>
              <ProfilePhoto src={photoUrl} alt="Foto de perfil" />
              <EditOverlay onClick={onEditPhotoClick}>Editar</EditOverlay>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handlePhotoChange}
              />
            </PhotoContainer>
          </ProfileWrapper>

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
                      value={form.nome_local ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, nome_local: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Celular</label>
                    <input
                      value={form.celular ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, celular: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Horário de Funcionamento</label>
                    <input
                      value={form.horario_funcionamento ?? ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          horario_funcionamento: e.target.value,
                        })
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

                  {/* CEP + buscar */}
                  <CepRow>
                    <FieldWrapper style={{ flex: 1 }}>
                      <label>CEP</label>
                      <input
                        value={form.cep ?? ""}
                        onChange={(e) =>
                          setForm({ ...form, cep: e.target.value })
                        }
                      />
                    </FieldWrapper>
                    <BuscarButton onClick={handleCepBuscar}>BUSCAR</BuscarButton>
                  </CepRow>

                  <FieldWrapper>
                    <label>Bairro</label>
                    <input
                      value={form.bairro ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, bairro: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Rua</label>
                    <input
                      value={form.rua ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, rua: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Cidade</label>
                    <input
                      value={form.cidade ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, cidade: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>UF</label>
                    <input
                      maxLength={2}
                      value={form.uf ?? ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          uf: e.target.value.toUpperCase().slice(0, 2),
                        })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Categoria Principal</label>
                    <input
                      value={form.categoria ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, categoria: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Demais Categorias</label>
                    <input
                      value={form.demais_categorias ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, demais_categorias: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  {/* BENEFÍCIOS */}
                  <TextAreaWrapper>
                    <label>Benefício Concedido</label>
                    <textarea
                      rows={6}
                      value={form.benefits ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, benefits: e.target.value })
                      }
                    />
                  </TextAreaWrapper>

                  <FieldWrapper>
                    <label>Instagram</label>
                    <input
                      value={form.instagram ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, instagram: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Site</label>
                    <input
                      type="url"
                      value={form.site ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, site: e.target.value })
                      }
                    />
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
