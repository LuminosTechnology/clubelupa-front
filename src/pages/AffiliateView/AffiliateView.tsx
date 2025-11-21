import { CapacitorBarcodeScanner } from "@capacitor/barcode-scanner";
import { Geolocation } from "@capacitor/geolocation";
import {
  IonActionSheet,
  IonAlert,
  IonContent,
  IonIcon,
  IonPage,
  IonSpinner,
  IonToast,
} from "@ionic/react";
import { AxiosError } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import backButtonVerde from "../../assets/arrow-left.svg";
import HeartIcon from "../../assets/like.svg?react";
import InstaIcon from "../../components/icons/InstaIcon";
import { useGamificationContext } from "../../contexts/GamificationContext";
import {
  doCheckIn,
  fetchSingleEstablishmentData,
  toggleFavorite,
  getCheckinDistanceMeters
} from "../../services/affiliateService";
import { CodeScannerService } from "../../services/code-scan-service";
import { uploadInvoice } from "../../services/invoice-upload-service";
import { Establishment } from "../../types/api/api";
import { haversine } from "../../utils/haversine";
import {
  AddressText,
  AlternativeButton,
  AlternativeLabel,
  AlternativeSection,
  BackButton,
  BackButtonWrapper,
  BehindScenesPhoto,
  ButtonsContainer,
  CheckinMessage,
  CTAButton,
  Description,
  Divider,
  ErrorMessage,
  InfoContainer,
  LikeButton,
  LinkIcon,
  LinkRow,
  LinksContainer,
  MainCategory,
  OpenStatus,
  PhotoHeader,
  ProductPhoto,
  ScrollArea,
  Section,
  SectionText,
  SectionTitle,
  SpinnerContainer,
  Title,
  TitleOpenStatusContainer,
  TitleWrapper,
} from "./AffiliateView.style";

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

  const [receiptPhotoFile, setReceiptPhotoFile] = useState<File | undefined>(undefined);
  const [receiptPhotoUrl, setReceiptPhotoUrl] = useState<string | undefined>(undefined);
  const receiptPhotoFileRef = useRef<HTMLInputElement>(null);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);

  const [isUploadingInvoice, setIsUploadingInvoice] = useState(false);
  const [showInvoiceSuccess, setShowInvoiceSuccess] = useState(false);
  const [showInvoiceError, setShowInvoiceError] = useState(false);
  const [invoiceMessage, setInvoiceMessage] = useState<string | undefined>(undefined);

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

  const handleReceiptPhotoClick = () => {
    setShowPhotoOptions(true);
  };

  const handleReceiptPhotoChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setReceiptPhotoFile(file);
    setReceiptPhotoUrl(URL.createObjectURL(file));
  };

  const clearReceiptPhoto = () => {
    setReceiptPhotoFile(undefined);
    setReceiptPhotoUrl(undefined);
    if (receiptPhotoFileRef.current) {
      receiptPhotoFileRef.current.value = '';
    }
  };

  const handleInvoiceUpload = async () => {
    if (!receiptPhotoFile || !id) return;

    setIsUploadingInvoice(true);
    try {
      const response = await uploadInvoice({
        establishment_id: Number(id),
        invoice_file: receiptPhotoFile,
      });
      
      setInvoiceMessage(response.message);
      setShowInvoiceSuccess(true);
      
      clearReceiptPhoto();
    } catch (error: any) {
      console.error("Erro ao enviar nota fiscal:", error);
      
      if (error.response?.data?.message) {
        setInvoiceMessage(error.response.data.message);
      } else {
        setInvoiceMessage("Erro ao enviar nota fiscal. Tente novamente.");
      }
      setShowInvoiceError(true);
    } finally {
      setIsUploadingInvoice(false);
    }
  };

  const handleCameraOption = async () => {
    setShowPhotoOptions(false);
    setIsLoadingScan(true);
    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({ hint: 0 });
      if (result.ScanResult) {
        setReceiptPhotoUrl(result.ScanResult);
        setScanMessage("Foto capturada com sucesso!");
        setShowScanSuccess(true);
      }
    } catch (error: any) {
      setScanMessage("Erro ao capturar foto");
      setShowScanError(true);
      console.error("Erro ao capturar foto:", error);
    } finally {
      setIsLoadingScan(false);
    }
  };

  const handleGalleryOption = () => {
    setShowPhotoOptions(false);
    receiptPhotoFileRef.current?.click();
  };

  const handleCheckIn = async () => {
    try {
      setData((prev) => {
        if (!prev) return undefined;
        return { ...prev, is_checked_in_by_me_last_hour: true };
      });

      const checkinResponse = await doCheckIn(Number(id));
      setShowCheckIn(true);
      setTimeout(async () => {
        await refetchGamificationSummary();        
      }, 1000);
      
    } catch (e) {
      setData((prev) => {
        if (!prev) return undefined;
        return { ...prev, is_checked_in_by_me_last_hour: false };
      });
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

        const checkinDistance = await getCheckinDistanceMeters();

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

        const DISTANCE_THRESHOLD = checkinDistance ? checkinDistance : 50;
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
        //setCheckInMessage("Erro ao buscar dados do afiliado.");
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

  const handleGoToAddress = () => {
    const address = data?.addresses[0];
    const fullAddressString = `${address?.street}, ${address?.number} ${address?.neighborhood}, ${address?.city}, ${address?.state}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      fullAddressString
    )}`;
    return url;
  };

  const handleStructure = (establishment: Establishment) => {
    switch (Number(establishment.structure_type)) {
      case 1:
        return "Física";
      case 2:
        return "Física e Online";
      case 3:
        return "Online";
      default:
        return "Desconhecido";
    }
  };

  const socialLinks = Array.isArray(data?.social_links)
    ? {} // transforma array vazio em objeto vazio
    : data?.social_links || {};

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
      <IonAlert
        isOpen={showInvoiceSuccess}
        header="Nota fiscal enviada"
        message={invoiceMessage}
        buttons={["OK"]}
        onDidDismiss={() => {
          setShowInvoiceSuccess(false);
        }}
      />
      <IonAlert
        isOpen={showInvoiceError}
        header="Erro ao enviar nota fiscal"
        message={invoiceMessage}
        buttons={["OK"]}
        onDidDismiss={() => {
          setShowInvoiceError(false);
          clearReceiptPhoto();
        }}
      />
      <IonActionSheet
        isOpen={showPhotoOptions}
        header="Escolha uma opção"
        buttons={[
          {
            text: "Tirar foto",
            icon: "camera",
            handler: handleCameraOption,
          },
          {
            text: "Escolher da galeria",
            icon: "images",
            handler: handleGalleryOption,
          },
          {
            text: "Cancelar",
            icon: "close",
            role: "cancel",
          },
        ]}
        onDidDismiss={() => setShowPhotoOptions(false)}
      />
      <IonContent fullscreen style={{ "--background": "#ffffff" } as any}>
        {!data ? (
          <SpinnerContainer>
            <IonSpinner color={"primary"} />
          </SpinnerContainer>
        ) : (
          <ScrollArea style={{"--margin-top":"0","--padding-top":"0"} as any}>
            <BackButtonWrapper color={color} onClick={() => history.goBack()}>
              <BackButton src={backButtonVerde} alt="Voltar" />
            </BackButtonWrapper>
            <PhotoHeader
              image={data?.shop_photo_url || "/assets/default-photo.png"}
            ></PhotoHeader>

            <InfoContainer>
              <TitleWrapper>
                <TitleOpenStatusContainer>
                  <Title color={color}>{data?.name}</Title>
                  <OpenStatus
                    status={
                      data.status_open === "Aberto"
                        ? "open"
                        : data.status_open === "Fechado"
                        ? "closed"
                        : undefined
                    }
                  >
                    {data.status_open_details.status_open}
                  </OpenStatus>
                  <p>{data.status_open_details.message}</p>
                </TitleOpenStatusContainer>

                <LikeButton
                  color={color}
                  onClick={handleFavorite}
                  liked={favorite}
                  animate={animating}
                >
                  <HeartIcon />
                </LikeButton>
              </TitleWrapper>

              <Section>
                {data.categories.length > 0 && (
                  <MainCategory color={color}>
                    {data.categories[0].name}
                  </MainCategory>
                )}

                {data?.categories.length > 0 && (
                  <SectionText>
                    {data.categories
                      .slice(1)
                      .map((category) => category.name)
                      .join(", ")}
                  </SectionText>
                )}
              </Section>

              {/* 
              <Section>
              <SectionTitle color={color}>Estrutura</SectionTitle>
              <SectionText>Física e online</SectionText>
              </Section> */}

              {data?.addresses.length > 0 && (
                <Section>
                  <SectionTitle color={color}>Endereço</SectionTitle>
                  <AddressText
                    href={handleGoToAddress()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data?.addresses[0].street}, {data?.addresses[0].number}
                  </AddressText>
                </Section>
              )}

              <Section>
                <SectionTitle color={color}>Estrutura</SectionTitle>
                <SectionText>{handleStructure(data)}</SectionText>
              </Section>

              <LinksContainer>
                {socialLinks?.instagram && (
                  <LinkRow
                    href={`${data?.social_links?.instagram}`}
                    rel="noopener noreferrer"
                    target="_blank"
                    color={color}
                  >
                    <IonIcon color={color} icon="logo-instagram" size="large" />
                    Acesse o instagram
                  </LinkRow>
                )}

                {socialLinks?.site && (
                  <LinkRow
                    href={`${data?.social_links?.site}`}
                    target="_blank"
                    color={color}
                    rel="noopener noreferrer"
                  >
                    <IonIcon color={color} icon="globe-outline" size="large" />
                    Acessar o site
                  </LinkRow>
                )}

                {data.whatsapp_number && (
                  <LinkRow
                    href={`https://wa.me/${data.whatsapp_number}`}
                    target="_blank"
                    color={color}
                    rel="noopener noreferrer"
                  >
                    <IonIcon color={color} icon="logo-whatsapp" size="large" />
                    Entrar no Whatsapp
                  </LinkRow>
                )}
              </LinksContainer>

              {data.product_photo_url && (
                <ProductPhoto src={data.product_photo_url} />
              )}

              {data?.description && (
                <Section>
                  <SectionTitle color={color}>Sobre a marca</SectionTitle>
                  <Description>{data?.description}</Description>
                </Section>
              )}

              {data.behind_the_scenes_photo_url && (
                <BehindScenesPhoto src={data.behind_the_scenes_photo_url} />
              )}

              <ButtonsContainer>
                {data.can_has_checkin && data.is_checked_in_by_me_last_hour ? (
                  <CheckinMessage color={color}>
                    Você já realizou check-in!
                  </CheckinMessage>
                ) : (
                  <>
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
                  </>
                )}

                {data.can_has_purchase && (
                  <CTAButton bg={color} onClick={handleScan}>
                    ESCANEAR NOTA
                  </CTAButton>
                )}
              </ButtonsContainer>

              {data.can_has_purchase && (
                <>
                  <Divider />
                  <AlternativeSection>
                    <AlternativeLabel>
                      Não possui QR Code ou Código de Barras?
                    </AlternativeLabel>
                    <AlternativeButton bg={color} onClick={handleReceiptPhotoClick}>
                      Enviar foto do recibo
                    </AlternativeButton>
                    <input
                      type="file"
                      ref={receiptPhotoFileRef}
                      style={{ display: "none" }}
                      onChange={handleReceiptPhotoChange}
                      accept="image/*"
                    />
                    {receiptPhotoUrl && (
                      <div style={{ marginTop: "12px", textAlign: "center" }}>
                        <img
                          src={receiptPhotoUrl}
                          alt="Foto do recibo"
                          style={{
                            maxWidth: "200px",
                            maxHeight: "200px",
                            borderRadius: "8px",
                            border: `2px solid ${color}`,
                          }}
                        />
                        <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#666" }}>
                          Foto selecionada com sucesso!
                        </p>
                        <AlternativeButton 
                          bg={color} 
                          onClick={handleInvoiceUpload}
                          disabled={isUploadingInvoice}
                          style={{ 
                            marginTop: "12px",
                            opacity: isUploadingInvoice ? 0.6 : 1,
                            cursor: isUploadingInvoice ? "not-allowed" : "pointer"
                          }}
                        >
                          {isUploadingInvoice ? "Enviando..." : "Enviar Nota Fiscal"}
                        </AlternativeButton>
                      </div>
                    )}
                  </AlternativeSection>
                </>
              )}
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
