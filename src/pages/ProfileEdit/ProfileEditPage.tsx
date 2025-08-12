// src/pages/ProfileEditPage/ProfileEditPage.tsx
import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import InputMask, { ReactInputMask } from "react-input-mask";

import profilePlaceholder from "../../assets/default-profile-photo.png";
import ScrollArea from "../../components/ScrollArea/ScrollArea";
import AppHeader from "../../components/SimpleHeader";

import {
  BuscarButton,
  CepRow,
  Content,
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
  TitleSection,
} from "./ProfileEditPage.style";

import { Input } from "../../components/FloatingInput/floating.style";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  updateProfilePhoto,
  updateUserProfile,
} from "../../services/auth-service";
import { fetchCep } from "../../services/viacepService";
import { UpdateUserRequest } from "../../types/api/user";

const ProfileEditPage: React.FC = () => {
  const history = useHistory();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { setUser, user } = useAuthContext();
  const [scrolled, setScrolled] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>(
    user?.avatar_url || profilePlaceholder
  );
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const FullProfileInformation = false;

  const [form, setForm] = useState<UpdateUserRequest>({
    address: {
      zip_code: "",
      street: "",
      number: undefined,
      neighborhood: "",
      city: "",
      state: "",
    },
    birth_date: "",
    phone_number: "",
    email: "",
    name: "",
    avatar: undefined,
  });

  useEffect(() => {
    (async () => {
      try {
        setForm({
          ...form,
          name: user?.name,
          email: user?.email,
          birth_date: user?.birth_date?.default.slice(0, 10),
          phone_number: user?.phone_number,
        });

        setPhotoUrl(user?.avatar_url ?? profilePlaceholder);
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
      const updatedUser = await updateUserProfile({
        ...form,
        avatar: photoFile || undefined,
      });

      setUser({
        ...user,
        ...updatedUser,
        avatar: photoFile,
      });
    } catch (err) {
      console.error("Erro ao salvar perfil/foto:", err);
      return;
    }

    // só volta depois de tudo
    history.goBack();
  };

  const handleFetchCep = async () => {
    const value = form?.address?.zip_code;
    if (!value) return;
    if (value.replace(/\D/g, "").length !== 8) return;
    const response = await fetchCep(value);
    if (response.cep) {
      setForm({
        ...form,
        address: {
          ...form.address,
          zip_code: response.cep,
          street: response.logradouro,
          complement: response.complemento,
          neighborhood: response.bairro,
          city: response.localidade,
          state: response.uf,
        },
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
                      value={form?.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Data de Nascimento</label>
                    <input
                      type="date"
                      value={form.birth_date}
                      onChange={(e) =>
                        setForm({ ...form, birth_date: e.target.value })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <label>Telefone</label>
                    <InputMask
                      mask={"(99) 99999-9999"}
                      maskChar={null}
                      placeholder="(11) 91234-5678"
                      value={form.phone_number}
                      onChange={(e) =>
                        setForm({ ...form, phone_number: e.target.value })
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
                        value={form?.address?.zip_code}
                        disabled={!FullProfileInformation}
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
                      value={form?.address?.street}
                      disabled={!FullProfileInformation}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          address: { ...form.address, street: e.target.value },
                        })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper disabled={!FullProfileInformation}>
                    <label>Bairro</label>
                    <input
                      placeholder="Bairro Exemplo"
                      value={form?.address?.neighborhood}
                      disabled={!FullProfileInformation}
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

                  <FieldWrapper disabled={!FullProfileInformation}>
                    <label>Cidade</label>
                    <input
                      placeholder="Cidade Exemplo"
                      value={form?.address?.city}
                      disabled={!FullProfileInformation}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          address: { ...form.address, city: e.target.value },
                        })
                      }
                    />
                  </FieldWrapper>

                  <FieldWrapper disabled={!FullProfileInformation}>
                    <label>UF</label>
                    <input
                      placeholder="SP"
                      maxLength={2}
                      value={form?.address?.state}
                      disabled={!FullProfileInformation}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          address: { ...form.address, state: e.target.value },
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
