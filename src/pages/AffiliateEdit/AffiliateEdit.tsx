import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';

import AppHeader from '../../components/SimpleHeader';
import FloatingInput from '../../components/FloatingInput';
import Button from '../../components/Button';

import {
  EditContainer,
  ProfileWrapper,
  ProfilePhoto,
  EditPhotoButton,
  TitleSection,
  SaveButtonWrapper,
  GreenTheme,          // ⬅ tema verde
} from './AffiliateEdit.style';

import profilePic from '../../assets/profile-pic.svg';

/* ---------- Tipagem ---------- */
interface AffiliateData {
  nome_local: string;
  celular: string;
  horario_funcionamento: string;
  email: string;
  cep: string;
  bairro: string;
  rua: string;
  cidade: string;
  uf: string;
  categoria: string;
  demais_categorias: string;
  instagram: string;
  site: string;
}

/* ---------- Estado inicial (mock) ---------- */
const initialData: AffiliateData = {
  nome_local: 'Local de Exemplo',
  celular: '(11) 98765-4321',
  horario_funcionamento: '09:00 às 18:00',
  email: 'contato@exemplo.com',
  cep: '01234-567',
  bairro: 'Centro',
  rua: 'Rua Exemplo',
  cidade: 'São Paulo',
  uf: 'SP',
  categoria: 'Comércio',
  demais_categorias: 'Restaurantes',
  instagram: '@exemplo',
  site: 'https://www.exemplo.com',
};

const AffiliateEdit: React.FC = () => {
  const history = useHistory();
  const [form, setForm] = useState<AffiliateData>(initialData);

  const handleSave = () => {
    console.table(form);   // aqui você chamaria o backend
    history.goBack();      // volta para a tela anterior
  };

  return (
    <IonPage>
      <AppHeader
        title="Editar Perfil Comercial"
        backgroundColor="#868950"
        textColor="#FFFFFF"
      />

      {/* Foto + botão editar */}
      <ProfileWrapper>
        <ProfilePhoto src={profilePic} alt="Foto de perfil" />
        <EditPhotoButton>Editar</EditPhotoButton>
      </ProfileWrapper>

      <IonContent fullscreen style={{ '--background': '#FFFFFF' }}>
        {/* aplica o tema verde apenas nesta página */}
        <GreenTheme>
          <EditContainer>
            <TitleSection>Editar Perfil Comercial</TitleSection>

            {/* -------- Campos -------- */}
            <FloatingInput
              label="Nome do Local"
              value={form.nome_local}
              onChange={(v) => setForm({ ...form, nome_local: v })}
            />
            <FloatingInput
              label="Celular"
              value={form.celular}
              onChange={(v) => setForm({ ...form, celular: v })}
              mask="(99) 99999-9999"
            />
            <FloatingInput
              label="Horário de Funcionamento"
              value={form.horario_funcionamento}
              onChange={(v) =>
                setForm({ ...form, horario_funcionamento: v })
              }
            />
            <FloatingInput
              label="E‑mail"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              type="email"
            />
            <FloatingInput
              label="CEP"
              value={form.cep}
              onChange={(v) => setForm({ ...form, cep: v })}
              mask="99999-999"
            />
            <FloatingInput
              label="Bairro"
              value={form.bairro}
              onChange={(v) => setForm({ ...form, bairro: v })}
            />
            <FloatingInput
              label="Rua"
              value={form.rua}
              onChange={(v) => setForm({ ...form, rua: v })}
            />
            <FloatingInput
              label="Cidade"
              value={form.cidade}
              onChange={(v) => setForm({ ...form, cidade: v })}
            />
            <FloatingInput
              label="UF"
              value={form.uf}
              onChange={(v) =>
                setForm({ ...form, uf: v.toUpperCase().slice(0, 2) })
              }
            />
            <FloatingInput
              label="Categoria"
              value={form.categoria}
              onChange={(v) => setForm({ ...form, categoria: v })}
            />
            <FloatingInput
              label="Demais Categorias"
              value={form.demais_categorias}
              onChange={(v) =>
                setForm({ ...form, demais_categorias: v })
              }
            />
            <FloatingInput
              label="Instagram"
              value={form.instagram}
              onChange={(v) => setForm({ ...form, instagram: v })}
            />
            <FloatingInput
              label="Site"
              value={form.site}
              onChange={(v) => setForm({ ...form, site: v })}
              type="url"
            />

            {/* Botão Salvar */}
            <SaveButtonWrapper>
              <Button variant="primary" onClick={handleSave}>
                Salvar Alterações
              </Button>
            </SaveButtonWrapper>
          </EditContainer>
        </GreenTheme>
      </IonContent>
    </IonPage>
  );
};

export default AffiliateEdit;
