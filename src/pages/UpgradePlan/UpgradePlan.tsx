// src/pages/UpgradePlan/UpgradePlan.tsx
import React, { useEffect, useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import AppHeader from '../../components/SimpleHeader';

import {
  ProfileContainer,
  AvatarWrapper,
  Avatar,
  UserName,
  UserSubInfo,
  FieldWrapper,
  Label,
  Input,
  Row,
  HalfField,
  CCVInput,
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
        setUser(await getUserByToken());
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleUpgrade = () => history.push('/plan/upgrade');

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

          {/* Campos de cartão */}
          <FieldWrapper>
            <Label>Nome do local</Label>
            <Input placeholder="Nome completo" />
          </FieldWrapper>

          <FieldWrapper>
            <Label>Número do cartão</Label>
            <Input placeholder="xxxx.xxxx.xxxx.xxxx" />
          </FieldWrapper>

          <Row>
            <HalfField>
              <Label>Data de Validade</Label>
              <Input placeholder="__/__/__" />
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
