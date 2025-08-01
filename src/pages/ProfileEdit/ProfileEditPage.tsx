// src/pages/ProfileEditPage/ProfileEditPage.tsx
import React, { useState, useEffect, useRef } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";

import InputMask from "react-input-mask";

import AppHeader from "../../components/SimpleHeader";
import ScrollArea from "../../components/ScrollArea/ScrollArea";
import profilePlaceholder from "../../assets/default-profile-photo.png";

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
import { User } from "../../services/interfaces/Auth";
import { Input } from "../../components/FloatingInput/floating.style";
import { useAuthContext } from "../../contexts/AuthContext";
import { fetchCep } from "../../services/viacepService";

const ProfileEditPage: React.FC = () => {
  const history = useHistory();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { setUser, user } = useAuthContext();
  const [scrolled, setScrolled] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>(
    user?.profile_photo || profilePlaceholder
  );
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const FullProfileInformation = false;

  const [form, setForm] = useState<Partial<User>>({
    nome_completo: "",
    data_nascimento: "",
    telefone: "",
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
      try {
        setForm({
          nome_completo: user?.nome_completo,
          data_nascimento: user?.data_nascimento
            ? user.data_nascimento.slice(0, 10)
            : "",
          telefone: user?.telefone,
          celular: user?.celular,
          cpf: user?.cpf,
          email: user?.email,
          cep: user?.cep,
          rua: user?.rua,
          bairro: user?.bairro,
          cidade: user?.cidade,
          uf: user?.uf,
        });

        setPhotoUrl(user?.profile_photo ?? profilePlaceholder);
      } catch (err) {
        console.error("Erro ao carregar usuário:", err);
      }
    })();
  }, [user]);

  const onEditPhotoClick = () => fileInputRef.current?.click();

  const handlePhotoChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    setPhotoFile(file);
    setPhotoUrl(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      const updatedUser = await updateUserProfile(form);

      let newProfilePhotoUrl = updatedUser.profile_photo;
      if (photoFile) {
        const newUrl = await updateProfilePhoto(photoFile);
        newProfilePhotoUrl = `${newUrl}?cb=${Date.now()}`;
        // atualiza localmente para preview imediato
        setPhotoUrl(`${newUrl}?cb=${Date.now()}`);
      }
      console.log(newProfilePhotoUrl);

      setUser({
        ...user,
        ...updatedUser,
        profile_photo: newProfilePhotoUrl,
        avatar_url: newProfilePhotoUrl,
      });
    } catch (err) {
      console.error("Erro ao salvar perfil/foto:", err);
      return;
    }

    // só volta depois de tudo
    history.goBack();
  };

  const handleFetchCep = async () => {
    const value = form.cep;
    if (!value) return;
    if (value.replace(/\D/g, "").length !== 8) return;
    const response = await fetchCep(value);
    if (response.cep) {
      setForm({
        ...form,
        cep: response.cep,
        cidade: response.localidade,
        uf: response.uf,
        bairro: response.bairro,
        rua: response.logradouro,
      });
    }
  };

  return (
    <IonPage>
      <IonContent
        fullscreen
        style={{ "--background": "#ffffff" } as React.CSSProperties}
      >
        <AppHeader
          title="Editar Perfil"
          backgroundColor="#868950"
          textColor="#FFFFFF"
        />

        <ScrollArea
          onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 0)}
        >
          <ProfileWrapper scrolled={scrolled}>
            <PhotoContainer>
              <ProfilePhoto
                src={photoUrl || "/assets/default-profile-photo.png"}
              />
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

                  {/* Campos do formulário */}
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
                    <label>Data de Nascimento</label>
                    <input
                      type="date"
                      value={form.data_nascimento}
                      onChange={(e) =>
                        setForm({ ...form, data_nascimento: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Telefone</label>
                    <input
                      placeholder="(11) 91234-5678"
                      value={form.telefone}
                      onChange={(e) =>
                        setForm({ ...form, telefone: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>E-mail</label>
                    <input
                      type="email"
                      placeholder="seuemail@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper disabled={!FullProfileInformation}>
                    <label>CPF</label>
                    <Input
                      as={InputMask}
                      mask="999.999.999-99"
                      maskChar={null}
                      placeholder="123.456.789-10"
                      value={form.cpf}
                      disabled={!FullProfileInformation}
                      onChange={(e) =>
                        setForm({ ...form, cpf: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <CepRow>
                    <FieldWrapper
                      style={{ flex: 1 }}
                      disabled={!FullProfileInformation}
                    >
                      <label>CEP</label>
                      <input
                        placeholder="12345-678"
                        value={form.cep}
                        disabled={!FullProfileInformation}
                        onChange={(e) =>
                          setForm({ ...form, cep: e.target.value })
                        }
                      />
                    </FieldWrapper>
                    <BuscarButton
                      disabled={!FullProfileInformation}
                      onClick={handleFetchCep}
                    >
                      BUSCAR
                    </BuscarButton>
                  </CepRow>

                  <FieldWrapper disabled={!FullProfileInformation}>
                    <label>Rua</label>
                    <input
                      placeholder="Rua Exemplo"
                      value={form.rua}
                      disabled={!FullProfileInformation}
                      onChange={(e) =>
                        setForm({ ...form, rua: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper disabled={!FullProfileInformation}>
                    <label>Bairro</label>
                    <input
                      placeholder="Bairro Exemplo"
                      value={form.bairro}
                      disabled={!FullProfileInformation}
                      onChange={(e) =>
                        setForm({ ...form, bairro: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper disabled={!FullProfileInformation}>
                    <label>Cidade</label>
                    <input
                      placeholder="Cidade Exemplo"
                      value={form.cidade}
                      disabled={!FullProfileInformation}
                      onChange={(e) =>
                        setForm({ ...form, cidade: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper disabled={!FullProfileInformation}>
                    <label>UF</label>
                    <input
                      placeholder="SP"
                      maxLength={2}
                      value={form.uf}
                      disabled={!FullProfileInformation}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          uf: e.target.value.toUpperCase().slice(0, 2),
                        })
                      }
                    />
                  </FieldWrapper>

                  <SaveButtonWrapper>
                    <SalvarButton type="button" onClick={handleSave}>
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

export default ProfileEditPage;
