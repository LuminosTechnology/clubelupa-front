// src/pages/UpgradePlan/UpgradePlan.tsx
import React, { useEffect, useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import AppHeader from '../../components/SimpleHeader';

import {
  AvatarWrapper,
  Avatar,
  ProfileContainer,
  UserName,
  UserSubInfo,
  FieldWrapper,
  Label,
  Input,
  CCVInput,
  Row,
  HalfField,
  ButtonWrapper,
  PremiumButton,
} from './UpgradePlan.style';

import { getUserByToken } from '../../services/auth-service';
import { User } from '../../services/interfaces/Auth';

import avatarPic from '../../assets/profile-pic.svg';

const UpgradePlan: React.FC = () => {
  const history = useHistory();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const fetched = await getUserByToken();
        setUser(fetched);
      } catch (err) {
        console.error('Erro ao buscar dados do usuário', err);
      }
    })();
  }, []);

  const handleUpgrade = () => {
    history.push('/plan/upgrade');
  };

  return (
    <IonPage>
      <AppHeader
        title="Cadastrar Cartão"
        backgroundColor="#868950"
        textColor="#FFFFFF"
      />

      <AvatarWrapper>
        <Avatar src={avatarPic} alt="Foto de perfil" />
      </AvatarWrapper>

      <IonContent fullscreen style={{ '--background': '#FFFFFF' } as any}>
        <ProfileContainer>
          <UserName>{user?.nome_completo}</UserName>
          <UserSubInfo>{user?.cpf}</UserSubInfo>
          <UserSubInfo>{user?.email}</UserSubInfo>

          <FieldWrapper>
            <Label>Nome do titular</Label>
            <Input placeholder="Nome completo" />
          </FieldWrapper>

          <FieldWrapper>
            <Label>Número do cartão</Label>
            <Input placeholder="xxxx.xxxx.xxxx.xxxx" />
          </FieldWrapper>

          <Row>
            <HalfField>
              <Label>Data de Validade</Label>
              <Input placeholder="MM/AA" />
            </HalfField>
            <HalfField>
              <Label>CCV</Label>
              <CCVInput
                placeholder="XXX"
                maxLength={3}
                inputMode="numeric"
              />
            </HalfField>
          </Row>

          <ButtonWrapper>
            <PremiumButton onClick={handleUpgrade}>
              CADASTRAR CARTÃO
            </PremiumButton>
          </ButtonWrapper>
        </ProfileContainer>
      </IonContent>
    </IonPage>
  );
};

export default UpgradePlan;
