import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";

import {
  ScrollArea,
  PhotoHeader,
  BackButtonWrapper,
  BackButton,
  InfoContainer,
  TitleWrapper,
  Title,
  LikeIcon,
  SubTitle,
  Section,
  SectionTitle,
  SectionText,
  LinkRow,
  LinkIcon,
  LinkText,
  CTAButton,
} from "./AffiliateView.style";

import backButtonVerde from "../../assets/arrow-left.svg";
import likeIcon from "../../assets/like.svg";
import { stores, Store } from "../AffiliateStores/AffiliateStoresPage";

interface Params {
  id: string;
}

const AffiliateView: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<Params>();
  const store: Store | undefined = stores.find(s => s.id === Number(id));

  if (!store) return null;

  return (
    <IonPage>
      <IonContent fullscreen style={{ "--background": "#ffffff" } as any}>
        <ScrollArea>
          {/* Header faz parte do scroll agora */}
          <PhotoHeader image={store.img}>
            <BackButtonWrapper
              color={store.color}
              onClick={() => history.goBack()}
              aria-label="Voltar"
            >
              <BackButton src={backButtonVerde} alt="" />
            </BackButtonWrapper>
          </PhotoHeader>

          {/* Conteúdo rolável junto com o header */}
          <InfoContainer>
            <TitleWrapper>
              <Title color={store.color}>{store.name}</Title>
              <LikeIcon src={likeIcon} alt="Curtir" />
            </TitleWrapper>
            <SubTitle color={store.color}>{store.category}</SubTitle>

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
              <SectionTitle color={store.color}>Horário de atendimento</SectionTitle>
              <SectionText>{store.schedule}</SectionText>
            </Section>

            <Section>
              <SectionTitle color={store.color}>Experiência Lupa</SectionTitle>
              <SectionText>
                Escolha entre o tônico “Self Love”, um sabonete facial, uma mini
                argila ou a pastilha dental “Tasty” nas compras acima de R$250!
              </SectionText>
            </Section>

            <Section>
              <SectionTitle color={store.color}>Como utilizar?</SectionTitle>
              <SectionText>
                No espaço físico: basta apresentar seu cartão virtual ao parceiro.
                <br />
                <br />
                Online: envie o código do seu cartão digital via WhatsApp ou
                Instagram e aguarde confirmação.
              </SectionText>
            </Section>

            <LinkRow>
              <LinkIcon $color={store.color} />
              <LinkText href="#" color={store.color}>
                Acesse o instagram
              </LinkText>
            </LinkRow>

            <CTAButton bg={store.color}>ESCANEAR NOTA</CTAButton>
          </InfoContainer>
        </ScrollArea>
      </IonContent>
    </IonPage>
  );
};

export default AffiliateView;
