import { IonContent, IonPage, IonSpinner, IonToast } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import backButtonVerde from "../../assets/arrow-left.svg";
import HeartIcon from "../../assets/like.svg?react";
import CheckinSuccessFooter from "../../components/CheckinSuccessFooter";
import InstaIcon from "../../components/icons/InstaIcon";
import {
  doCheckIn,
  fetchSingleEstablishmentData,
  toggleFavorite,
} from "../../services/affiliateService";
import { Establishment } from "../../types/api/api";
import {
  BackButton,
  BackButtonWrapper,
  CTAButton,
  Description,
  InfoContainer,
  LikeButton,
  LinkIcon,
  LinkRow,
  LinkText,
  PhotoHeader,
  PlainLink,
  PlainLinkRow,
  ScrollArea,
  Section,
  SectionText,
  SectionTitle,
  SpinnerContainer,
  Title,
  TitleWrapper,
} from "./AffiliateView.style";
import { haversine } from "../../utils/haversine";
import { Geolocation } from "@capacitor/geolocation";
import { AxiosError } from "axios";

interface Params {
  id: string;
}

const AffiliateView: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<Params>();
  const [data, setData] = useState<Establishment | undefined>();
  const [favorite, setFavorite] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [canCheckIn, setCanCheckIn] = useState(true);
  const [cantCheckIn, setCantCheckIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const color = data?.categories[0]?.color || "#E6C178";

  const handleCheckIn = async () => {
    try {
      await doCheckIn(Number(id));
      setShowCheckIn(true);
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.status === 429) {
          const message =
            e?.response?.data.message || "Erro ao realizar check-in";
          setErrorMessage(message);
          setCantCheckIn(true);
        }
      }
      console.error("Erro ao fazer check-in:", e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const response = await fetchSingleEstablishmentData(Number(id));
      setData(response.data);
      setFavorite(response.data.is_favorited_by_me);

      const userLocation = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
      });

      const distance = haversine(
        userLocation.coords.latitude,
        userLocation.coords.longitude,
        response.data.addresses[0].latitude,
        response.data.addresses[0].longitude
      );

      console.log("distance:", distance);

      console.log({ myLocation: userLocation.coords });

      const DISTANCE_THRESHOLD = 200;
      setCanCheckIn(distance < DISTANCE_THRESHOLD);
    };

    fetchData();
  }, []);

  const handleFavorite = async () => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);
    try {
      await toggleFavorite(Number(id));
      setFavorite((v) => !v);
    } catch (e) {
      setFavorite((v) => !v);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen style={{ "--background": "#ffffff" } as any}>
        {!data ? (
          <SpinnerContainer>
            <IonSpinner color={"primary"} />
          </SpinnerContainer>
        ) : (
          <ScrollArea>
            <PhotoHeader image={data?.product_photo_url || ""}>
              <BackButtonWrapper color={color} onClick={() => history.goBack()}>
                <BackButton src={backButtonVerde} alt="Voltar" />
              </BackButtonWrapper>
            </PhotoHeader>

            <InfoContainer>
              <TitleWrapper>
                <Title color={color}>{data?.name}</Title>
                <LikeButton
                  color={color}
                  onClick={handleFavorite}
                  liked={favorite}
                  animate={animating}
                >
                  <HeartIcon />
                </LikeButton>
              </TitleWrapper>

              {data?.categories.length > 0 &&
                data?.categories.map((c, i) => (
                  <Section key={i}>
                    <SectionTitle color={color}>Categoria</SectionTitle>
                    <SectionText>{c.name}</SectionText>
                  </Section>
                ))}
              {/* 
              <Section>
                <SectionTitle color={color}>Estrutura</SectionTitle>
                <SectionText>Física e online</SectionText>
              </Section> */}

              {data?.addresses.length > 0 && (
                <Section>
                  <SectionTitle color={color}>Endereço</SectionTitle>
                  <SectionText>
                    {data?.addresses[0].street}, {data?.addresses[0].number}
                  </SectionText>
                </Section>
              )}

              {/* {!!schedule && (
                <Section>
                  <SectionTitle color={color}>
                    Horário de atendimento
                  </SectionTitle>
                  <SectionText>{schedule}</SectionText>
                </Section>
              )} */}

              {data?.description && (
                <Section>
                  <SectionTitle color={color}>Sobre nós</SectionTitle>
                  <Description>{data?.description}</Description>
                </Section>
              )}

              {data?.social_links.instagram && (
                <LinkRow>
                  <LinkIcon color={color}>
                    <InstaIcon size={18} />
                  </LinkIcon>
                  <LinkText
                    href={`https://instagram.com/${data?.social_links.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    color={color}
                  >
                    Acesse o instagram
                  </LinkText>
                </LinkRow>
              )}

              {data?.social_links.website && (
                <PlainLinkRow>
                  <PlainLink href="#" target="_blank" color={color}>
                    Acesse o site
                  </PlainLink>
                </PlainLinkRow>
              )}

              <CTAButton
                bg={color}
                onClick={handleCheckIn}
                disabled={!canCheckIn}
              >
                FAZER CHECK-IN
              </CTAButton>
              <CTAButton
                bg={color}
                onClick={() => history.push("/affiliate/scanner")}
              >
                ESCANEAR NOTA
              </CTAButton>
            </InfoContainer>
          </ScrollArea>
        )}

        {showCheckIn && (
          <CheckinSuccessFooter
            isOpen={showCheckIn}
            onClose={() => setShowCheckIn(false)}
          />
        )}

        <IonToast
          isOpen={cantCheckIn}
          message={errorMessage}
          color="warning"
          duration={5000}
          onDidDismiss={() => setCantCheckIn(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default AffiliateView;
