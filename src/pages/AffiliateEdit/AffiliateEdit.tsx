// src/pages/AffiliateEdit/AffiliateEdit.tsx
import React, { useState, useRef } from "react";
import { IonPage, IonContent } from "@ionic/react";
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
  CepRow,
  BuscarButton,
  SaveButtonWrapper,
  GreenLabelTheme,
  InputTextTheme,
  SalvarButton,
} from "./AffiliateEdit.style";

import { AffiliateData } from "../../services/interfaces/Affiliate";

const AffiliateEdit: React.FC = () => {
  const history = useHistory();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>(profilePlaceholder);

  const [form, setForm] = useState<AffiliateData>({
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
  });

  const onEditPhotoClick = () => fileInputRef.current?.click();

  const handlePhotoChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setPhotoUrl(URL.createObjectURL(file));
  };

  const handleSave = () => {
    // Aqui você pode chamar sua API para salvar os dados
    console.log("Dados do afiliado:", form);
    history.goBack();
  };

  return (
    <IonPage>
      <IonContent
        fullscreen
        style={{ "--background": "#ffffff" } as React.CSSProperties}
      >
        {/* HEADER FIXO */}
        <AppHeader
          title="Editar Perfil Comercial"
          backgroundColor="#868950"
          textColor="#FFFFFF"
        />

        {/* ÁREA ROLÁVEL ABAIXO DO HEADER */}
        <ScrollArea onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 0)}>
          {/* FOTO DE PERFIL FIXA/DESAPARECE AO ROLAR */}
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

          {/* CONTEÚDO DO FORMULÁRIO */}
          <Content>
            <GreenLabelTheme>
              <InputTextTheme>
                <EditContainer>
                  <TitleSection>Editar Perfil Comercial</TitleSection>

                  <FieldWrapper>
                    <label>Nome do Local</label>
                    <input
                      placeholder="Nome do Local"
                      value={form.nome_local}
                      onChange={(e) =>
                        setForm({ ...form, nome_local: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Celular</label>
                    <input
                      placeholder="(41) 99999‑9999"
                      value={form.celular}
                      onChange={(e) =>
                        setForm({ ...form, celular: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Horário de Funcionamento</label>
                    <input
                      placeholder="Seg‑Sex 09:00 às 18:00"
                      value={form.horario_funcionamento}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          horario_funcionamento: e.target.value,
                        })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>E‑mail</label>
                    <input
                      type="email"
                      placeholder="contato@exemplo.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <CepRow>
                    <FieldWrapper style={{ flex: 1 }}>
                      <label>CEP</label>
                      <input
                        placeholder="01234‑567"
                        value={form.cep}
                        onChange={(e) =>
                          setForm({ ...form, cep: e.target.value })
                        }
                      />
                    </FieldWrapper>
                    <BuscarButton>BUSCAR</BuscarButton>
                  </CepRow>

                  <FieldWrapper>
                    <label>Bairro</label>
                    <input
                      placeholder="Centro"
                      value={form.bairro}
                      onChange={(e) =>
                        setForm({ ...form, bairro: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Rua</label>
                    <input
                      placeholder="Rua Exemplo"
                      value={form.rua}
                      onChange={(e) =>
                        setForm({ ...form, rua: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Cidade</label>
                    <input
                      placeholder="Curitiba"
                      value={form.cidade}
                      onChange={(e) =>
                        setForm({ ...form, cidade: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>UF</label>
                    <input
                      placeholder="PR"
                      maxLength={2}
                      value={form.uf}
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
                      placeholder="Cosméticos"
                      value={form.categoria}
                      onChange={(e) =>
                        setForm({ ...form, categoria: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Demais Categorias</label>
                    <input
                      placeholder="Infantil, Sustentável"
                      value={form.demais_categorias}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          demais_categorias: e.target.value,
                        })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Instagram</label>
                    <input
                      placeholder="@seuperfil"
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
                      placeholder="https://www.exemplo.com"
                      value={form.site}
                      onChange={(e) =>
                        setForm({ ...form, site: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <SaveButtonWrapper>
                    <SalvarButton onClick={handleSave}>
                      SALVAR
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
