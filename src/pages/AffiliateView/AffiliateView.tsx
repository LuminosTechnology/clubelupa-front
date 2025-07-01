import React, { useCallback, useEffect, useState } from "react";
import { IonPage, IonContent, IonLoading } from "@ionic/react";
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
  BoldLink,
  HistoryRow,
  HistoryIcon,
  HistTitle,
  HistText,
} from "./AffiliateView.style";

import backButtonVerde from "../../assets/arrow-left.svg";
import heartIcon from "../../assets/like.svg";
import sampleImg from "../../assets/sample-store.png";

import InstaIcon from "../../components/icons/InstaIcon";
import LupaIcon from "../../components/icons/LupaIcon";

import { getAffiliateById } from "../../services/affiliateService";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../../services/favoritesService";
import { AffiliateData } from "../../services/interfaces/Affiliate";  

interface Params {
  id: string;
}

const AffiliateView: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<Params>();

  const [store, setStore] = useState<AffiliateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);

  /* ─── carrega o afiliado ───────────────────────────────────────── */
  useEffect(() => {
    (async () => {
      try {
        const data = await getAffiliateById(id);
        setStore(data);
      } catch (err) {
        console.error("[AffiliateView] Falha ao buscar afiliado:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  /* ─── favoritos ────────────────────────────────────────────────── */
  useEffect(() => {
    if (!store) return;
    (async () => {
      try {
        const favs = await getFavorites();
        setLiked(favs.some((f) => f.id === store.id));
      } catch (err) {
        console.error("[AffiliateView] Erro ao verificar favoritos:", err);
      }
    })();
  }, [store]);

  const handleLike = useCallback(async () => {
    if (!store) return;
    setAnimating(true);
    try {
      if (!liked) {
        await addFavorite(store.id);
        setLiked(true);
      } else {
        await removeFavorite(store.id);
        setLiked(false);
      }
    } catch (e) {
      console.error("Erro ao (des)favoritar:", e);
    } finally {
      setTimeout(() => setAnimating(false), 300);
    }
  }, [liked, store]);

  /* ─── loading / erro ───────────────────────────────────────────── */
  if (loading) {
    return (
      <IonPage>
        <IonLoading isOpen message="Carregando…" />
      </IonPage>
    );
  }

  if (!store) return null;

  /* ─── helpers p/ nomenclatura antiga ───────────────────────────── */
  const color = store.color ?? "#E6C178";
  const img = store.foto_perfil ?? sampleImg;
  const name = store.nome_local || store.nome_fantasia;
  const category = store.categoria;
  const schedule = store.horario_funcionamento;

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
              <LikeButton
                onClick={handleLike}
                liked={liked}
                animate={animating}
                aria-label={liked ? "Descurtir" : "Curtir"}
              >
                <img src={heartIcon} alt="Coração" />
              </LikeButton>
            </TitleWrapper>

            <Description>
              Sócio Lupa, escaneie ou insira aqui sua nota para acumular moedas
              e trocar por experiências incríveis!
            </Description>

            <CTAButton bg={color} onClick={() => history.push("/affiliate/scanner")}>
              ESCANEAR NOTA
            </CTAButton>

            {/* seções dinâmicas */}
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
              <SectionText>
                {store.rua ?? "Rua"} {store.bairro && `– ${store.bairro}`}
                <br />
                {store.cidade ?? ""} {store.uf ?? ""}
              </SectionText>
            </Section>

            {!!schedule && (
              <Section>
                <SectionTitle color={color}>Horário de atendimento</SectionTitle>
                <SectionText>{schedule}</SectionText>
              </Section>
            )}

            {!!store.instagram && (
              <LinkRow>
                <LinkIcon color={color}>
                  <InstaIcon size={18} />
                </LinkIcon>
                <LinkText
                  href={`https://instagram.com/${store.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  color={color}
                >
                  Acesse o instagram
                </LinkText>
              </LinkRow>
            )}

            {!!store.site && (
              <PlainLinkRow>
                <PlainLink href={store.site} target="_blank" color={color}>
                  Acesse o site
                </PlainLink>
              </PlainLinkRow>
            )}

            <BoldLink href="#" color={color}>
              SOBRE A MARCA AUTORAL / ESTABELECIMENTO
            </BoldLink>

            {/* descrição estática de exemplo */}
            <HistoryRow>
              <HistoryIcon color={color}>
                <LupaIcon size={18} />
              </HistoryIcon>
              <HistTitle color={color}>História:</HistTitle>
            </HistoryRow>
            <HistText>
              Fundada em 2016 pela publicitária Patricia Lima…
            </HistText>
          </InfoContainer>
        </ScrollArea>
      </IonContent>
    </IonPage>
  );
};

export default AffiliateView;
