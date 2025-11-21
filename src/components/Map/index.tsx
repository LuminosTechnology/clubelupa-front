import { Geolocation } from "@capacitor/geolocation";
import { GoogleMap } from "@capacitor/google-maps";
import {
  IonAlert,
  IonIcon,
  useIonViewDidEnter,
  useIonViewWillEnter,
  IonActionSheet
} from "@ionic/react";
import { close, qrCode, documentText, locate } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import {
  ButtonsContainer,
  CheckInButton,
  CloseButton,
  MapWrapper,
  OpenStatus,
  RestaurantCard,
  RestaurantDetails,
  RestaurantImage,
  RestaurantInfo,
  ScanButton,
  ViewMoreButton,
  InvoiceArea,
  InvoiceShowAreaButton,
  SendNotaFiscalButton,
  RecenterButton
} from "./map.style";

import { uploadInvoice } from '../../services/invoice-upload-service';

import { 
  Divider, 
  AlternativeButton, 
  AlternativeLabel, 
  AlternativeSection, 
} from '../../pages/AffiliateView/AffiliateView.style';

import { CapacitorBarcodeScanner } from "@capacitor/barcode-scanner";
import { Capacitor } from "@capacitor/core";
import { AxiosError } from "axios";
import { useHistory } from "react-router";
import { useGamificationContext } from "../../contexts/GamificationContext";
import { useDebounce } from "../../hooks/useDebounce";
import {
  doCheckIn,
  getAllEstablishments,
} from "../../services/affiliateService";
import { CodeScannerService } from "../../services/code-scan-service";
import { AffiliateData } from "../../services/interfaces/Affiliate";
import { Establishment } from "../../types/api/api";
import { haversine } from "../../utils/haversine";
import { useParametersContext } from "../../contexts/ParametersContext";

interface MapProps {
  onViewMore: (r: AffiliateData) => void;
  searchValue: string;
  mapReady: boolean;
}

const ANDROID_API_KEY = "AIzaSyDoIWw3SXNki0nyFrJGoTjzHO5CkTqU1ms";
const IOS_API_KEY = "AIzaSyCGAcnhspK_rIozcUIXNX3Pe3DwpHMMaQc";
const HTTP_API_KEY = "AIzaSyCADmNNz3iLtqV7UX-mY83WJnL6m3gpdkU";

const Map: React.FC<MapProps> = ({ searchValue, mapReady }) => {
  const history = useHistory();
  const [gMap, setGMap] = useState<GoogleMap | null>(null);
  const { data } = useParametersContext();
  const [userLoc, setUserLoc] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const mapRef = useRef<HTMLDivElement>(null);
  const markerMapRef = useRef<Record<string, Establishment>>({});

  const [selected, setSelected] = useState<Establishment | undefined>();
  const [establishments, setEstablishments] = useState<Establishment[]>([]);

  const [isLoadingScan, setIsLoadingScan] = useState(false);
  const [showCheckIn, setShowCheckIn] = useState(false);

  const [scanMessage, setScanMessage] = useState<string | undefined>();
  const [showScanSuccess, setShowScanSuccess] = useState(false);
  const [showScanError, setShowScanError] = useState(false);

  const { refetchGamificationSummary } = useGamificationContext();

  const [checkinError, setCheckinError] = useState<string | undefined>();
  const [showCheckinError, setShowCheckinError] = useState(false);

  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [receiptPhotoFile, setReceiptPhotoFile] = useState<File | undefined>(undefined);
  const [receiptPhotoUrl, setReceiptPhotoUrl] = useState<string | undefined>(undefined);
  const receiptPhotoFileRef = useRef<HTMLInputElement>(null);

  const [isUploadingInvoice, setIsUploadingInvoice] = useState(false);
  const [showInvoiceSuccess, setShowInvoiceSuccess] = useState(false);
  const [showInvoiceError, setShowInvoiceError] = useState(false);
  const [invoiceMessage, setInvoiceMessage] = useState<string | undefined>(undefined);  

  const [showInvoiceArea, setShowInvoiceArea] = useState(false);

  const DEFAULT_LOCATION = { lat: -25.427806, lng: -49.265102 };

  const apiKey = () => {
    switch (Capacitor.getPlatform()) {
      case "ios":
        return IOS_API_KEY;
      case "android":
        return ANDROID_API_KEY;
      default:
        return HTTP_API_KEY;
    }
  };

  /* ─── localização do usuário ─────────────────────────────────────────── */
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const { coords } = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
        });
        setUserLoc({ lat: coords.latitude, lng: coords.longitude });
      } catch {
        setUserLoc(DEFAULT_LOCATION);
      }
    };
    fetchUserLocation();
  }, []);

  const debouncedSearchValue = useDebounce(searchValue, 300);

  useEffect(() => {
    const fetchEstablishments = async () => {
      const response = await getAllEstablishments(debouncedSearchValue);
      setEstablishments(response.data);
    };
    fetchEstablishments();
  }, [debouncedSearchValue]);

  /* ─── Inicialização do Mapa (nova lógica) ───────────────────────────── */
  useEffect(() => {

  
    const initMap = async () => {
      if (gMap) return;
      if (!mapRef.current || !mapReady) return;

      const newMap = await GoogleMap.create({
        apiKey: apiKey(),
        id: "affiliates-map",
        element: mapRef.current,
        config: {
          center: DEFAULT_LOCATION,
          zoom: 11,

          androidLiteMode: false,
          disableDefaultUI: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          rotateControl: false,
          clickableIcons: false,

          styles: [
            {
              featureType: "poi",
              elementType: "all",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
          ],
        },
      });

      //await newMap.disableClustering();
      await newMap.enableCurrentLocation(true);

      setGMap(newMap);
    };

    initMap();

    return () => {
      if (gMap) {
        gMap.destroy();
        setGMap(null);
      }
    };

  }, [mapReady]);

  useIonViewWillEnter(() => {
    console.log({ gMap });
  });

  useEffect(() => {
    const setUserLocation = async () => {
      if (userLoc && gMap) {
        await gMap.setCamera({
          coordinate: userLoc,
          zoom: 11,
          animate: true,
        });
      }
    };

    setUserLocation();
  }, [userLoc, gMap]);

  /* ─── Adicionar/Remover Marcadores (nova lógica) ────────────────────── */
  useEffect(() => {
    if (!gMap || establishments.length === 0) return;

    const updateMarkers = async () => {
      const markersIds = Object.keys(markerMapRef.current);
      if (markersIds.length > 0) {
        await gMap.removeMarkers(markersIds);
      }
      markerMapRef.current = {};
    
      // Agrupar estabelecimentos por coordenada
      const coordGroups: Record<string, Establishment[]> = {};
      establishments.forEach((e) => {
        const lat = Number(e.addresses[0]?.latitude);
        const lng = Number(e.addresses[0]?.longitude);
        if (!lat || !lng) return;
    
        const key = `${lat.toFixed(6)}_${lng.toFixed(6)}`;
        if (!coordGroups[key]) coordGroups[key] = [];
        coordGroups[key].push(e);
      });
    
      // Para cada grupo de coordenadas, aplicar um deslocamento
      for (const key in coordGroups) {
        const group = coordGroups[key];
        const angleStep = (2 * Math.PI) / group.length;
        const radius = 0.0001; // ~11 metros, ajusta conforme zoom
    
        for (let i = 0; i < group.length; i++) {
          const e = group[i];
    
          // Deslocamento circular em torno da coordenada base
          const baseLat = Number(e.addresses[0].latitude);
          const baseLng = Number(e.addresses[0].longitude);
    
          const offsetLat = baseLat + radius * Math.cos(i * angleStep);
          const offsetLng = baseLng + radius * Math.sin(i * angleStep);
    
          const iconUrl =
            e.categories.find((c) => c.parent_id === null)?.icon_url ||
            "assets/affiliate_pin.png";
    
          const markerId = await gMap.addMarker({
            coordinate: { lat: offsetLat, lng: offsetLng },
            iconUrl,
            iconSize: { width: 50, height: 50 },
            iconAnchor: { x: 25, y: 50 },
          });
    
          markerMapRef.current[markerId || e.id] = e;
        }
      }
    
      await gMap.setOnMarkerClickListener((m) => {
        const establishment = markerMapRef.current[m.markerId];
        if (establishment) setSelected(establishment);
      });
    };
    

    updateMarkers();
  }, [establishments, gMap]);

  const handleViewMore = (id: number) => {
    history.push(`/affiliate-view/${id}`);
  };

  const handleScan = async (id: number) => {
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

  const handleCheckIn = async (id: number) => {
    try {
      setEstablishments((prev) =>
        prev.map((est) =>
          est.id === id ? { ...est, is_checked_in_by_me_last_hour: true } : est
        )
      );
      if (selected?.id === id) {
        setSelected((prev) =>
          prev ? { ...prev, is_checked_in_by_me_last_hour: true } : prev
        );
      }

      await doCheckIn(Number(id)); // chamada real pro backend
      setShowCheckIn(true);

      // refetch do gamification (pode ser opcional)
      setTimeout(async () => {
        await refetchGamificationSummary();
      }, 1000);
    } catch (e) {
      // rollback se der erro
      setEstablishments((prev) =>
        prev.map((est) =>
          est.id === id ? { ...est, is_checked_in_by_me_last_hour: false } : est
        )
      );
      if (selected?.id === id) {
        setSelected((prev) =>
          prev ? { ...prev, is_checked_in_by_me_last_hour: false } : prev
        );
      }

      if (e instanceof AxiosError) {
        if (e.status === 429) {
          const message =
            e?.response?.data.message || "Erro ao realizar check-in";
          setCheckinError(message);
          setShowCheckinError(true);
        }
      }
      console.error("Erro ao fazer check-in:", e);
    }
  };
  

  const getDistanceAndCheckin = (est: Establishment) => {
    if (!userLoc || !est.addresses.length || !data?.max_checkin_distance_meters)
      return { distance: -1, canCheckin: false };

    const distance = haversine(
      userLoc.lat,
      userLoc.lng,
      Number(est.addresses[0].latitude),
      Number(est.addresses[0].longitude)
    );

    const canCheckin = distance <= data.max_checkin_distance_meters;

    return { distance, canCheckin };
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

const handleRecenterMap = async () => {
    if (gMap && userLoc) {
      await gMap.setCamera({
        coordinate: userLoc,
        zoom: 11, // Um zoom mais próximo é melhor para recentralizar
        animate: true,
      });
    }
  };

  const handleInvoiceUpload = async () => {
    if (!receiptPhotoFile || !selected?.id) return;

    setIsUploadingInvoice(true);
    try {
      const response = await uploadInvoice({
        establishment_id: Number(selected.id),
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
      setShowInvoiceArea(false);
    }
  };

  const handleReceiptPhotoClick = () => {
    setShowPhotoOptions(true);
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
      setShowInvoiceArea(false);
    }
  };

  const handleGalleryOption = () => {
    setShowPhotoOptions(false);
    receiptPhotoFileRef.current?.click();
  };  

    const handleShowInvoice = () => {
    setShowInvoiceArea(true);
  };  

  const color = '#E6C178';

  /* ─── UI ─────────────────────────────────────────────────────────────── */
  return (
    <MapWrapper>
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
        message={`Você realizou check-in`}
        buttons={["OK"]}
        onDidDismiss={() => setShowCheckIn(false)}
      />
      <IonAlert
        isOpen={showCheckinError}
        header="Erro"
        message={checkinError}
        buttons={["OK"]}
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
  
  
      <capacitor-google-map
        ref={mapRef}
        id="map"
        style={{
          display: "block",
          // position: "absolute",
          width: "100%",
          height: "100%",
        }}
      ></capacitor-google-map>

      <RecenterButton onClick={handleRecenterMap}>
        <IonIcon icon={locate} />
      </RecenterButton>

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

      <RestaurantCard className={!!selected ? "show" : ""}>
        <CloseButton
          onClick={() => {
            setSelected(undefined);
            setShowInvoiceArea(false);
          }}
        >
          <IonIcon icon={close} />
        </CloseButton>

        <RestaurantInfo>
          <RestaurantImage
            src={selected?.shop_photo_url || "/assets/default-photo.png"}
            alt={selected?.name}
          />
          <RestaurantDetails>
            {selected && (
              <>
                <h3>{selected?.name}</h3>
                <OpenStatus
                  status={
                    selected.status_open === "Aberto"
                      ? "open"
                      : selected.status_open === "Fechado"
                      ? "closed"
                      : undefined
                  }
                >
                  {selected.status_open_details.status_open}
                </OpenStatus>
                <p>{selected.status_open_details.message}</p>
                <p>
                  {selected?.addresses[0]?.street},{" "}
                  {selected?.addresses[0]?.number}
                </p>
                {userLoc && (
                  <p>
                    Distância:{" "}
                    {Math.round(
                      getDistanceAndCheckin(selected).distance / 1000
                    )}{" "}
                    Km
                  </p>
                )}
              </>
            )}
            <ButtonsContainer>
              {selected && (
                <ViewMoreButton
                  onClick={() => {
                    handleViewMore(selected.id);
                    setSelected(undefined);
                  }}
                >
                  Ver mais sobre
                </ViewMoreButton>
              )}
              {selected?.can_has_checkin &&
              selected.is_checked_in_by_me_last_hour ? (
                <p>Você já realizou check-in!</p>
              ) : selected?.can_has_checkin ? (
                getDistanceAndCheckin(selected).canCheckin ? (
                  <CheckInButton onClick={() => handleCheckIn(selected.id)}>
                    FAZER CHECK-IN
                  </CheckInButton>
                ) : (
                  <p>Muito longe do local para fazer check-in.</p>
                )
              ) : null}


              <Divider />
              <AlternativeLabel>
                Escanear com Qr Code ou Envio de Nota
              </AlternativeLabel>
              <ScanButton onClick={ handleShowInvoice }>
                ESCANEAR NOTA
              </ScanButton>       

              {selected?.can_has_purchase && showInvoiceArea && (                  

                  <InvoiceArea style={{ width: '100%' }}>
                      <br/>
                 
                    <>                      
                      <AlternativeSection style={{ flexDirection: 'row', textWrap: 'nowrap', width: '100%'  }}>
                        <ViewMoreButton 
                          onClick={() => handleScan(selected.id)} 
                          style={{ 
                            width: '50%', 
                            display: 'flex', 
                            flexDirection:'row', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            gap: '0 4px'
                          }}>
                            <IonIcon icon={qrCode} slot="start" />
                            QR CODE
                        </ViewMoreButton>                           
                        {/* <AlternativeLabel> OU </AlternativeLabel> */}
                        <ViewMoreButton 
                          onClick={handleReceiptPhotoClick} 
                          style={{ 
                            width: '50%', 
                            display: 'flex', 
                            flexDirection:'row', 
                            alignItems: 'center', 
                            justifyContent: 'center' ,
                            gap: '0 4px'
                          }}>
                          {/* <IonIcon icon={documentText} slot="start" /> */}
                          Enviar recibo
                        </ViewMoreButton>
                        
                        <input
                          type="file"
                          ref={receiptPhotoFileRef}
                          style={{ display: "none" }}
                          onChange={handleReceiptPhotoChange}
                          accept="image/*"
                        />
                      </AlternativeSection>
                    </>
                    <br />
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
                        <SendNotaFiscalButton 
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
                        </SendNotaFiscalButton>
                      </div>
                    )}
                    <br />            

                  </InvoiceArea>             
              )}
            </ButtonsContainer>
          </RestaurantDetails>
        </RestaurantInfo>
      </RestaurantCard>
    </MapWrapper>
  );
};

export default Map;
