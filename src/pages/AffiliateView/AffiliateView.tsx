import React, { useCallback, useMemo, useState } from "react";
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
  LikeButton,
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
  ConfettiPiece
} from "./AffiliateView.style";
import backButtonVerde from "../../assets/arrow-left.svg";
import heartIcon from "../../assets/like.svg";
import InstaIcon from "../../components/icons/InstaIcon";
import { affiliates } from "../../contexts/mock";
import CheckinSuccessFooter from "../../components/CheckinSuccessFooter";

interface Params {
  id: string;
}

const AffiliateView: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<Params>();
  const mockData = affiliates.find(a => a.id === Number(id));
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const color = "#E6C178";
  const img = mockData?.image || "";
  const name = mockData?.nome_fantasia || "";
  const category = mockData?.category?.join(", ") || "N/|";
  const schedule = mockData?.hours || "";

  const handleLike = useCallback(() => {
    setAnimating(true);
    setLiked(v => !v);
    setTimeout(() => setAnimating(false), 300);
  }, []);

  const handleCheckin = () => {
    setShowFooter(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3500);
  };

  const confettiPieces = useMemo(() => {
    if (!showConfetti) return [];
    const amount = 60;
    const colors = ["#FF4D4F", "#40A9FF", "#73D13D", "#FAAD14", "#EB2F96", "#13C2C2"];
    const minDur = 1800;
    const maxDur = 3200;
    const delaySpread = 400;
    return Array.from({ length: amount }).map((_, i) => {
      const left = Math.random() * 100;
      const size = 6 + Math.random() * 10;
      const colorPiece = colors[i % colors.length];
      const duration = minDur + Math.random() * (maxDur - minDur);
      const delay = Math.random() * delaySpread;
      return { left, size, colorPiece, duration, delay, key: i };
    });
  }, [showConfetti]);

  return (
    <IonPage>
      <IonContent fullscreen style={{ "--background": "#ffffff" } as any}>
        <ScrollArea>
          <PhotoHeader image={img}>
            <BackButtonWrapper color={color} onClick={() => history.goBack()}>
              <BackButton src={backButtonVerde} alt="Voltar" />
            </BackButtonWrapper>
          </PhotoHeader>

          <InfoContainer>
            <TitleWrapper>
              <Title color={color}>{name}</Title>
              <LikeButton onClick={handleLike} liked={liked} animate={animating}>
                <img src={heartIcon} alt="Coração" />
              </LikeButton>
            </TitleWrapper>

            {!!category && (
              <Section>
                <SectionTitle color={color}>Categoria</SectionTitle>
                <SectionText>{category}</SectionText>
              </Section>
            )}

            <Section>
              <SectionTitle color={color}>Estrutura</SectionTitle>
              <SectionText>Física e online</SectionText>
            </Section>

            <Section>
              <SectionTitle color={color}>Endereço</SectionTitle>
              <SectionText>{mockData?.address}</SectionText>
            </Section>

            {!!schedule && (
              <Section>
                <SectionTitle color={color}>Horário de atendimento</SectionTitle>
                <SectionText>{schedule}</SectionText>
              </Section>
            )}

            <Section>
              <SectionTitle color={color}>Sobre nós</SectionTitle>
              <Description>{mockData?.description}</Description>
            </Section>

            <LinkRow>
              <LinkIcon color={color}>
                <InstaIcon size={18} />
              </LinkIcon>
              <LinkText href={`https://instagram.com/@`} target="_blank" rel="noopener noreferrer" color={color}>
                Acesse o instagram
              </LinkText>
            </LinkRow>

            <PlainLinkRow>
              <PlainLink href="#" target="_blank" color={color}>
                Acesse o site
              </PlainLink>
            </PlainLinkRow>

            <CTAButton bg={color} onClick={handleCheckin}>
              FAZER CHECK-IN
            </CTAButton>
            <CTAButton bg={color} onClick={() => history.push("/affiliate/scanner")}>
              ESCANEAR NOTA
            </CTAButton>
          </InfoContainer>
        </ScrollArea>

        {showConfetti &&
          confettiPieces.map(p => (
            <ConfettiPiece
              key={p.key}
              left={p.left}
              size={p.size}
              color={p.colorPiece}
              duration={p.duration}
              delay={p.delay}
            />
          ))}

        {showFooter && (
          <CheckinSuccessFooter
            affiliateName={name}
            coinsEarned={50}
            onRedeem={() => {}}
            onClose={() => setShowFooter(false)}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default AffiliateView;
