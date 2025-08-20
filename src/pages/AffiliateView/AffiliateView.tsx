import { CapacitorBarcodeScanner } from "@capacitor/barcode-scanner";
import { Geolocation } from "@capacitor/geolocation";
import {
  IonAlert,
  IonContent,
  IonPage,
  IonSpinner,
  IonToast,
} from "@ionic/react";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import backButtonVerde from "../../assets/arrow-left.svg";
import HeartIcon from "../../assets/like.svg?react";
import InstaIcon from "../../components/icons/InstaIcon";
import { useGamificationContext } from "../../contexts/GamificationContext";
import {
  doCheckIn,
  fetchSingleEstablishmentData,
  toggleFavorite,
} from "../../services/affiliateService";
import { Establishment } from "../../types/api/api";
import { haversine } from "../../utils/haversine";
import {
  BackButton,
  BackButtonWrapper,
  ButtonsContainer,
  CTAButton,
  Description,
  ErrorMessage,
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
import { CodeScannerService } from "../../services/code-scan-service";

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
  const [canCheckIn, setCanCheckIn] = useState(false);
  const [cantCheckIn, setCantCheckIn] = useState(false);
  const [checkInMessage, setCheckInMessage] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const [showScanSuccess, setShowScanSuccess] = useState(false);
  const [showScanError, setShowScanError] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | undefined>(undefined);
  const [isLoadingScan, setIsLoadingScan] = useState(false);

  const { refetchGamificationSummary } = useGamificationContext();

  const color = data?.categories[0]?.color || "#E6C178";

  const handleScan = async () => {
    setIsLoadingScan(true);
    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({ hint: 0 });

      let cleanResult = result.ScanResult || "";

      cleanResult = cleanResult.replace(/^\uFEFF/, "");

      if (cleanResult.startsWith("?")) {
        cleanResult = cleanResult.slice(1);
      }

      const encodedUrl = encodeURI(cleanResult);

      const response = await CodeScannerService.scanPurchaseCode({
        establishment_id: Number(id),
        qr_code_url: encodedUrl,
      });
      setScanMessage(response.message);
      setShowScanSuccess(true);
    } catch (error: any) {
      setScanMessage(error.response.data.message || "Erro ao escanear código");
      setShowScanError(true);
      console.error("Erro ao escanear código:", JSON.stringify(error, null, 2));

      if (error instanceof AxiosError) {
        console.error(
          "Erro ao escanear código:",
          JSON.stringify(error.response, null, 2)
        );
      }
    } finally {
      setIsLoadingScan(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      await doCheckIn(Number(id));
      setShowCheckIn(true);
      setTimeout(async () => {
        await refetchGamificationSummary();
      }, 1000);
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
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await fetchSingleEstablishmentData(Number(id));
        const establishment = response.data;

        setData(establishment);
        setFavorite(establishment.is_favorited_by_me);

        const { coords } = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
        });

        const distance = haversine(
          coords.latitude,
          coords.longitude,
          response.data.addresses[0].latitude,
          response.data.addresses[0].longitude
        );

        const DISTANCE_THRESHOLD = 10_000;
        const isWithinDistance = distance < DISTANCE_THRESHOLD;
        const hasNotCheckedInLastHour =
          !establishment.is_checked_in_by_me_last_hour;

        setCanCheckIn(isWithinDistance && hasNotCheckedInLastHour);

        if (!isWithinDistance) {
          return setCheckInMessage(
            "Você está muito longe do local para fazer check-in."
          );
        }
        if (!hasNotCheckedInLastHour) {
          return setCheckInMessage(
            "Você já fez check-in neste local. Tente novamente mais tarde."
          );
        }
      } catch (error) {
        console.error("Erro ao buscar dados do afiliado:", error);
        setCheckInMessage("Erro ao buscar dados do afiliado.");
      }
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
      <IonAlert
        isOpen={showScanSuccess}
        header="Código escaneado"
        message={scanMessage}
        buttons={["OK"]}
        onDidDismiss={() => setShowScanSuccess(false)}
      />
      <IonAlert
        isOpen={showScanError}
        header="Erro"
        message={scanMessage}
        buttons={["OK"]}
        onDidDismiss={() => setShowScanError(false)}
      />
      <IonAlert
        isOpen={showCheckIn}
        header="Check-in realizado"
        message={`Você realizou check-in em ${data?.name}`}
        buttons={["OK"]}
        onDidDismiss={() => setShowCheckIn(false)}
      />
      <IonContent fullscreen style={{ "--background": "#ffffff" } as any}>
        {!data ? (
          <SpinnerContainer>
            <IonSpinner color={"primary"} />
          </SpinnerContainer>
        ) : (
          <ScrollArea>
            <PhotoHeader
              image={data?.product_photo_url || "/assets/default-photo.png"}
            >
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

              {data?.social_links?.instagram && (
                <LinkRow>
                  <LinkIcon color={color}>
                    <InstaIcon size={18} />
                  </LinkIcon>
                  <LinkText
                    href={`https://instagram.com/${data?.social_links?.instagram}`}
                    rel="noopener noreferrer"
                    color={color}
                  >
                    Acesse o instagram
                  </LinkText>
                </LinkRow>
              )}

              {data?.social_links?.site && (
                <PlainLinkRow>
                  <PlainLink
                    href={data?.social_links?.site}
                    target="_blank"
                    color={color}
                  >
                    Acesse o site
                  </PlainLink>
                </PlainLinkRow>
              )}
              <ButtonsContainer>
                {checkInMessage && (
                  <ErrorMessage>{checkInMessage}</ErrorMessage>
                )}
                <CTAButton
                  bg={color}
                  onClick={handleCheckIn}
                  disabled={!canCheckIn}
                >
                  FAZER CHECK-IN
                </CTAButton>
                <CTAButton bg={color} onClick={handleScan}>
                  ESCANEAR NOTA
                </CTAButton>
              </ButtonsContainer>
            </InfoContainer>
          </ScrollArea>
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
