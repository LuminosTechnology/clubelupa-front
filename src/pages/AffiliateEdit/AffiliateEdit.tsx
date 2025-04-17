import React, { useState, useRef } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import AppHeader from '../../components/SimpleHeader';
import profilePlaceholder from '../../assets/profile-pic.svg';

import {
  Container,
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
} from './AffiliateEdit.style';

import { AffiliateData } from '../../services/interfaces/Affiliate';

const AffiliateEdit: React.FC = () => {
  const [form, setForm] = useState<AffiliateData>({
    nome_local: 'Fernanda Paludo',
    celular: '',
    horario_funcionamento: '',
    email: '',
    cep: '',
    bairro: '',
    rua: '',
    cidade: '',
    uf: '',
    categoria: '',
    demais_categorias: '',
    instagram: '',
    site: '',
  });
  const [scrolled, setScrolled] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>(profilePlaceholder);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    console.log(form);
    alert('Dados salvos localmente!');
  };

  const onEditPhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    if (!e.target.files?.length) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhotoUrl(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <IonPage>
      <AppHeader
        title="Editar Perfil Comercial"
        backgroundColor="#868950"
        textColor="#FFFFFF"
      />

          <ProfileWrapper scrolled={scrolled}>
            <PhotoContainer>
              <ProfilePhoto src={photoUrl} alt="Foto de perfil" />
              <EditOverlay onClick={onEditPhotoClick}>Editar</EditOverlay>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handlePhotoChange}
              />
            </PhotoContainer>
          </ProfileWrapper>
      <IonContent
        fullscreen
        style={{ '--background': '#868950' }}
        onIonScroll={e => setScrolled(e.detail.scrollTop > 0)}
      >
        <Content>

          <GreenLabelTheme>
            <InputTextTheme>
              <EditContainer>
                <TitleSection>Editar Perfil Comercial</TitleSection>

                <FieldWrapper>
                  <label>Nome do Local</label>
                  <input
                    placeholder="Fernanda Paludo"
                    value={form.nome_local}
                    onChange={e =>
                      setForm({ ...form, nome_local: e.target.value })
                    }
                  />
                </FieldWrapper>

                <FieldWrapper>
                  <label>Celular</label>
                  <input
                    placeholder="(41) 99999‑9999"
                    value={form.celular}
                    onChange={e =>
                      setForm({ ...form, celular: e.target.value })
                    }
                  />
                </FieldWrapper>

                <FieldWrapper>
                  <label>Horário de Funcionamento</label>
                  <input
                    placeholder="Seg‑Sex 09:00 às 18:00"
                    value={form.horario_funcionamento}
                    onChange={e =>
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
                    onChange={e =>
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
                      onChange={e =>
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
                    onChange={e =>
                      setForm({ ...form, bairro: e.target.value })
                    }
                  />
                </FieldWrapper>

                <FieldWrapper>
                  <label>Rua</label>
                  <input
                    placeholder="Rua Exemplo"
                    value={form.rua}
                    onChange={e =>
                      setForm({ ...form, rua: e.target.value })
                    }
                  />
                </FieldWrapper>

                <FieldWrapper>
                  <label>Cidade</label>
                  <input
                    placeholder="Curitiba"
                    value={form.cidade}
                    onChange={e =>
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
                    onChange={e =>
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
                    onChange={e =>
                      setForm({ ...form, categoria: e.target.value })
                    }
                  />
                </FieldWrapper>

                <FieldWrapper>
                  <label>Demais Categorias</label>
                  <input
                    placeholder="Infantil, Marcas com viés sustentável"
                    value={form.demais_categorias}
                    onChange={e =>
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
                    placeholder="@exemplo"
                    value={form.instagram}
                    onChange={e =>
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
                    onChange={e =>
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
      </IonContent>
    </IonPage>
  );
};

export default AffiliateEdit;
