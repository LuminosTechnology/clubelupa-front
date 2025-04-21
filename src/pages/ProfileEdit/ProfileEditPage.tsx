// src/pages/ProfileEditPage/ProfileEditPage.tsx
import React, { useState, useEffect, useRef } from "react";
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
} from "./ProfileEditPage.style";

import {
  getUserByToken,
  updateUserProfile,
  updateProfilePhoto,
} from "../../services/auth-service";
import { User } from "../../services/interfaces/Auth";  // <-- corrigido

const ProfileEditPage: React.FC = () => {
  const history = useHistory();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>(profilePlaceholder);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // usar Partial<User> para inicializar apenas os campos que interessam
  const [form, setForm] = useState<Partial<User>>({
    nome_completo: "",
    celular: "",
    cpf: "",
    email: "",
    cep: "",
    rua: "",
    bairro: "",
    cidade: "",
    uf: "",
  });

  useEffect(() => {
    (async () => {
      const user = await getUserByToken();
      setForm({
        nome_completo: user.nome_completo,
        celular: user.celular,
        cpf: user.cpf,
        email: user.email,
        cep: user.cep,
        rua: user.rua,
        bairro: user.bairro,
        cidade: user.cidade,
        uf: user.uf,
      });
      if ((user as any).avatar_url) {
        setPhotoUrl((user as any).avatar_url);
      }
    })();
  }, []);

  const onEditPhotoClick = () => fileInputRef.current?.click();

  const handlePhotoChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    setPhotoFile(file);
    setPhotoUrl(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    await updateUserProfile(form);
    if (photoFile) {
      await updateProfilePhoto(photoFile);
    }
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
          title="Editar Perfil"
          backgroundColor="#868950"
          textColor="#FFFFFF"
        />

        {/* ÁREA ROLÁVEL ABAIXO DO HEADER */}
        <ScrollArea onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 0)}>
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

          <Content>
            <GreenLabelTheme>
              <InputTextTheme>
                <EditContainer>
                  <TitleSection>Editar Perfil</TitleSection>

                  <FieldWrapper>
                    <label>Nome Completo</label>
                    <input
                      placeholder="Nome Completo"
                      value={form.nome_completo}
                      onChange={(e) =>
                        setForm({ ...form, nome_completo: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Celular</label>
                    <input
                      placeholder="(11) 99876‑5432"
                      value={form.celular}
                      onChange={(e) =>
                        setForm({ ...form, celular: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>CPF</label>
                    <input
                      placeholder="123.456.789‑10"
                      value={form.cpf}
                      onChange={(e) =>
                        setForm({ ...form, cpf: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>E‑mail</label>
                    <input
                      type="email"
                      placeholder="joaoatualizado@example.com"
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
                        placeholder="12345‑678"
                        value={form.cep}
                        onChange={(e) =>
                          setForm({ ...form, cep: e.target.value })
                        }
                      />
                    </FieldWrapper>
                    <BuscarButton>BUSCAR</BuscarButton>
                  </CepRow>

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
                    <label>Bairro</label>
                    <input
                      placeholder="Bairro Exemplo"
                      value={form.bairro}
                      onChange={(e) =>
                        setForm({ ...form, bairro: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Cidade</label>
                    <input
                      placeholder="Cidade Exemplo"
                      value={form.cidade}
                      onChange={(e) =>
                        setForm({ ...form, cidade: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>UF</label>
                    <input
                      placeholder="SP"
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

export default ProfileEditPage;
