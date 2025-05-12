/* ────────────────────────────────────────────
 * src/pages/AffiliateView/AffiliateView.tsx
 * ──────────────────────────────────────────── */
import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';

import {
  ScrollArea,
  PhotoHeader,
  BackButtonWrapper,
  BackButton,
  InfoContainer,
  TitleWrapper,
  Title,
  LikeIcon,
  Description,
  CTAButton,
  Section,
  SectionTitle,
  SectionText,
  LinkRow,
  LinkIcon,
  LinkText,
  PlainLinkRow,
  PlainLink,
  BoldLink,
  HistoryRow,
  HistoryIcon,
  HistTitle,
  HistText,
} from './AffiliateView.style';

import backButtonVerde from '../../assets/arrow-left.svg';
import heartIcon from '../../assets/like.svg';

import InstaIcon from '../../components/icons/InstaIcon';
import LupaIcon from '../../components/icons/LupaIcon';

import { stores, Store } from '../AffiliateStores/AffiliateStoresPage';

interface Params {
  id: string;
}

const AffiliateView: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<Params>();
  const store: Store | undefined = stores.find((s) => s.id === Number(id));

  if (!store) return null;

  return (
    <IonPage>
      <IonContent fullscreen style={{ '--background': '#ffffff' } as any}>
        <ScrollArea>
          <PhotoHeader image={store.img}>
            <BackButtonWrapper
              color={store.color}
              onClick={() => history.goBack()}
              aria-label="Voltar"
            >
              <BackButton src={backButtonVerde} alt="Voltar" />
            </BackButtonWrapper>
          </PhotoHeader>

          <InfoContainer>
            <TitleWrapper>
              <Title color={store.color}>{store.name}</Title>
              <LikeIcon src={heartIcon} alt="Curtir" />
            </TitleWrapper>

            <Description>
              Sócio Lupa, escaneie ou insira aqui sua nota para acumular moedas e
              trocar por experiências incríveis!
            </Description>

            <CTAButton
              bg={store.color}
              onClick={() => history.push('/affiliate/scanner')}
            >
              ESCANEAR NOTA
            </CTAButton>

            {/* seções fixas */}
            <Section>
              <SectionTitle color={store.color}>Categoria</SectionTitle>
              <SectionText>{store.category}</SectionText>
            </Section>

            <Section>
              <SectionTitle color={store.color}>Estrutura</SectionTitle>
              <SectionText>Física e online</SectionText>
            </Section>

            <Section>
              <SectionTitle color={store.color}>Endereço</SectionTitle>
              <SectionText>
                Alameda Prudente de Moraes, 1213
                <br />
                Centro, Curitiba – PR
              </SectionText>
            </Section>

            <Section>
              <SectionTitle color={store.color}>
                Horário de atendimento
              </SectionTitle>
              <SectionText>{store.schedule}</SectionText>
            </Section>

            {/* link com ícone Instagram */}
            <LinkRow>
              <LinkIcon color={store.color}>
                <InstaIcon size={18} />
              </LinkIcon>
              <LinkText href="#" color={store.color}>
                Acesse o instagram
              </LinkText>
            </LinkRow>

            {/* links SEM ícone */}
            <PlainLinkRow>
              <PlainLink href="#" color={store.color}>
                Acesse o site
              </PlainLink>
            </PlainLinkRow>

            {/* link em negrito sempre sublinhado */}
            <BoldLink href="#" color={store.color}>
              SOBRE A MARCA AUTORAL / ESTABELECIMENTO
            </BoldLink>

            {/* história com ícone ao lado */}
            <HistoryRow>
              <HistoryIcon color={store.color}>
                <LupaIcon size={18} />
              </HistoryIcon>
              <HistTitle color={store.color}>História:</HistTitle>
            </HistoryRow>
            <HistText>
              Fundada em 2016 pela publicitária Patricia Lima, a marca foi
              lançada oficialmente na maior semana de moda do Brasil: São Paulo
              Fashion Week. Ao levar o conceito de cosméticos orgânicos e
              veganos para a passarela, se tornou a marca orgânica mais
              conhecida do Brasil (…)
            </HistText>
          </InfoContainer>
        </ScrollArea>
      </IonContent>
    </IonPage>
  );
};

export default AffiliateView;
