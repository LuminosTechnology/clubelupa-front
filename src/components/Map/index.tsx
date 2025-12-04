import { Geolocation } from "@capacitor/geolocation";
// ADICIONE O MarkerF AQUI NOS IMPORTS
import { GoogleMap, useJsApiLoader, OverlayView, MarkerF } from "@react-google-maps/api";
import {
  IonAlert,
  IonIcon,
  useIonViewWillEnter,
  IonActionSheet,
  IonSpinner
} from "@ionic/react";
import { close, qrCode, locate } from "ionicons/icons";
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
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
  SendNotaFiscalButton,
  RecenterButton
} from "./map.style";

import { uploadInvoice } from '../../services/invoice-upload-service';

import { 
  Divider, 
  AlternativeLabel, 
  AlternativeSection, 
} from '../../pages/AffiliateView/AffiliateView.style';

import { CapacitorBarcodeScanner } from "@capacitor/barcode-scanner";
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

const HTTP_API_KEY = "AIzaSyCADmNNz3iLtqV7UX-mY83WJnL6m3gpdkU";

// Estilos para limpar o mapa
const mapStyles = [
  { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] },
  { featureType: "transit", elementType: "labels.icon", stylers: [{ visibility: "off" }] }
];

const containerStyle = { width: '100%', height: '100%' };

const AffiliatesMap: React.FC<MapProps> = ({ searchValue, mapReady }) => {
  const history = useHistory();
  const { data } = useParametersContext();
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: HTTP_API_KEY
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLoc, setUserLoc] = useState<{ lat: number; lng: number } | null>(null);
  const DEFAULT_LOCATION = { lat: -25.427806, lng: -49.265102 };

  const [selected, setSelected] = useState<Establishment | undefined>();
  const [establishments, setEstablishments] = useState<Establishment[]>([]);

  // Estados auxiliares (Scan, Checkin, etc)
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

  /* ─── Geolocalização ─────────────────────────────────────────── */
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const { coords } = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
        const loc = { lat: coords.latitude, lng: coords.longitude };
        setUserLoc(loc);
        if (map) map.panTo(loc);
      } catch {
        setUserLoc(DEFAULT_LOCATION);
      }
    };
    fetchUserLocation();
  }, [map]);

  /* ─── Busca ─────────────────────────────────────────────────── */
  const debouncedSearchValue = useDebounce(searchValue, 300);
  useEffect(() => {
    const fetchEstablishments = async () => {
      const response = await getAllEstablishments(debouncedSearchValue);
      setEstablishments(response.data);
    };
    fetchEstablishments();
  }, [debouncedSearchValue]);

  /* ─── Cálculo de Posições (Otimizado) ───────────────────────── */
  const { normalPins, featuredPins } = useMemo(() => {
    const coordGroups: Record<string, Establishment[]> = {};
    const normal: any[] = [];
    const featured: any[] = [];

    // 1. Agrupar
    establishments.forEach((e) => {
      const lat = Number(e.addresses[0]?.latitude);
      const lng = Number(e.addresses[0]?.longitude);
      if (!lat || !lng) return;
      const key = `${lat.toFixed(6)}_${lng.toFixed(6)}`;
      if (!coordGroups[key]) coordGroups[key] = [];
      coordGroups[key].push(e);
    });

    // 2. Calcular posições e separar Normal vs Destaque
    for (const key in coordGroups) {
      const group = coordGroups[key];
      const angleStep = (2 * Math.PI) / group.length;
      const radius = 0.00012; 

      group.forEach((e, i) => {
        const baseLat = Number(e.addresses[0].latitude);
        const baseLng = Number(e.addresses[0].longitude);
        const offsetLat = group.length > 1 ? baseLat + radius * Math.cos(i * angleStep) : baseLat;
        const offsetLng = group.length > 1 ? baseLng + radius * Math.sin(i * angleStep) : baseLng;

        const iconUrl = e.has_highlight
          ? e.categories.find((c) => c.parent_id === null)?.icon_highlight_url || "assets/affiliate_pin.png"
          : e.categories.find((c) => c.parent_id === null)?.icon_url || "assets/affiliate_pin.png";

        // === TESTE DE ANIMAÇÃO ===
        // Altere aqui a condição real. Ex: e.id === selected?.id
        const isFeatured = e.id === 11;// Teste: o primeiro de cada grupo é destaque

        const pinData = {
          id: e.id,
          establishment: e,
          position: { lat: offsetLat, lng: offsetLng },
          iconUrl,
        };

        if (isFeatured) {
          featured.push(pinData);
        } else {
          normal.push(pinData);
        }
      });
    }
    return { normalPins: normal, featuredPins: featured };
  }, [establishments, selected]);

  /* ─── Map Helpers ───────────────────────────────────────────── */
  const onLoad = useCallback((map: google.maps.Map) => setMap(map), []);
  const onUnmount = useCallback(() => setMap(null), []);
  const handleRecenterMap = () => { if (map && userLoc) { map.panTo(userLoc); map.setZoom(14); } };

  /* ─── Handlers de Negócio ───────────────────────────────────── */
  const handleViewMore = (id: number) => { history.push(`/affiliate-view/${id}`); };

  const handleScan = async (id: number) => {
    setIsLoadingScan(true);
    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({ hint: 0 });
      let cleanResult = result.ScanResult || "";
      cleanResult = cleanResult.replace(/^\uFEFF/, "");
      if (cleanResult.startsWith("?")) cleanResult = cleanResult.slice(1);
      const encodedUrl = encodeURI(cleanResult);
      const response = await CodeScannerService.scanPurchaseCode({ establishment_id: Number(id), qr_code_url: encodedUrl });
      setScanMessage(response.message); setShowScanSuccess(true);
    } catch (error: any) {
      setScanMessage(error.response?.data?.message || "Erro ao escanear"); setShowScanError(true);
    } finally { setIsLoadingScan(false); }
  };

  const handleCheckIn = async (id: number) => {
    try {
      setEstablishments((prev) => prev.map((est) => est.id === id ? { ...est, is_checked_in_by_me_last_hour: true } : est));
      if (selected?.id === id) setSelected((prev) => prev ? { ...prev, is_checked_in_by_me_last_hour: true } : prev);
      await doCheckIn(Number(id)); setShowCheckIn(true);
      setTimeout(async () => { await refetchGamificationSummary(); }, 1000);
    } catch (e) {
      setEstablishments((prev) => prev.map((est) => est.id === id ? { ...est, is_checked_in_by_me_last_hour: false } : est));
      if (e instanceof AxiosError && e.status === 429) { setCheckinError(e?.response?.data.message); setShowCheckinError(true); }
    }
  };
  
  const getDistanceAndCheckin = (est: Establishment) => {
    if (!userLoc || !est.addresses.length || !data?.max_checkin_distance_meters) return { distance: -1, canCheckin: false };
    const distance = haversine(userLoc.lat, userLoc.lng, Number(est.addresses[0].latitude), Number(est.addresses[0].longitude));
    return { distance, canCheckin: distance <= data.max_checkin_distance_meters };
  };

  const handleInvoiceUpload = async () => {
    if (!receiptPhotoFile || !selected?.id) return;
    setIsUploadingInvoice(true);
    try {
      const response = await uploadInvoice({ establishment_id: Number(selected.id), invoice_file: receiptPhotoFile });
      setInvoiceMessage(response.message); setShowInvoiceSuccess(true); clearReceiptPhoto();
    } catch (error: any) {
      setInvoiceMessage(error.response?.data?.message || "Erro ao enviar."); setShowInvoiceError(true);
    } finally { setIsUploadingInvoice(false); setShowInvoiceArea(false); }
  };

  const handleReceiptPhotoChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) { setReceiptPhotoFile(file); setReceiptPhotoUrl(URL.createObjectURL(file)); }
  };
  const clearReceiptPhoto = () => { setReceiptPhotoFile(undefined); setReceiptPhotoUrl(undefined); if (receiptPhotoFileRef.current) receiptPhotoFileRef.current.value = ''; };
  const handleCameraOption = async () => {
    setShowPhotoOptions(false); setIsLoadingScan(true);
    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({ hint: 0 });
      if (result.ScanResult) { setReceiptPhotoUrl(result.ScanResult); setScanMessage("Foto capturada!"); setShowScanSuccess(true); }
    } catch { setScanMessage("Erro ao capturar"); setShowScanError(true); } 
    finally { setIsLoadingScan(false); setShowInvoiceArea(false); }
  };
  const handleGalleryOption = () => { setShowPhotoOptions(false); receiptPhotoFileRef.current?.click(); };  
  const color = '#E6C178';

  if (!isLoaded) return <IonSpinner name="crescent" style={{ position: 'absolute', top: '50%', left: '50%' }} />;

  return (
    <MapWrapper>
      <style>
        {`
          @keyframes pulse-ring {
            0% { transform: scale(0.8); opacity: 0.8; }
            100% { transform: scale(2.5); opacity: 0; }
          }
          .custom-pin-container {
            position: absolute; transform: translate(-50%, -100%);
            cursor: pointer; display: flex; align-items: center; justify-content: center;
          }
          .pin-image { width: 40px; height: 40px; }
          /* Estilo Destaque */
          .pin-featured .pin-image { width: 55px; height: 55px; z-index: 100; position: relative; }
          .pin-pulse {
            position: absolute; width: 55px; height: 55px;
            background: rgba(230, 193, 120, 0.6);
            border-radius: 50%; top: 0; left: 0;
            z-index: 1;
            animation: pulse-ring 2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
          }
        `}
      </style>

      {/* Alertas ... */}
      <IonAlert isOpen={showScanSuccess} header="Sucesso" message={scanMessage} buttons={["OK"]} onDidDismiss={() => setShowScanSuccess(false)} />
      <IonAlert isOpen={showScanError} header="Erro" message={scanMessage} buttons={["OK"]} onDidDismiss={() => setShowScanError(false)} />
      <IonAlert isOpen={showCheckIn} header="Check-in" message="Você realizou check-in!" buttons={["OK"]} onDidDismiss={() => setShowCheckIn(false)} />
      <IonAlert isOpen={showCheckinError} header="Erro" message={checkinError} buttons={["OK"]} onDidDismiss={() => setShowCheckinError(false)} />
      <IonAlert isOpen={showInvoiceSuccess} header="Sucesso" message={invoiceMessage} buttons={["OK"]} onDidDismiss={() => setShowInvoiceSuccess(false)} />
      <IonAlert isOpen={showInvoiceError} header="Erro" message={invoiceMessage} buttons={["OK"]} onDidDismiss={() => { setShowInvoiceError(false); clearReceiptPhoto(); }} />

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLoc || DEFAULT_LOCATION}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          disableDefaultUI: true,
          styles: mapStyles,
          clickableIcons: false,
          minZoom: 3,
        }}
      >
        {/* 1. RENDERIZAÇÃO LEVE (MARKERF) PARA PINS NORMAIS */}
        {normalPins.map((item) => (
          <MarkerF
            key={`normal-${item.id}`}
            position={item.position}
            icon={{
              url: item.iconUrl,
              scaledSize: new google.maps.Size(40, 40) // Tamanho fixo para performance
            }}
            onClick={() => setSelected(item.establishment)}
          />
        ))}

        {/* 2. RENDERIZAÇÃO PESADA (OVERLAYVIEW) APENAS PARA O DESTAQUE */}
        {featuredPins.map((item) => (
          <OverlayView
            key={`featured-${item.id}`}
            position={item.position}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div 
              className="custom-pin-container pin-featured"
              onClick={(e) => { e.stopPropagation(); setSelected(item.establishment); }}
            >
              <div className="pin-pulse"></div>
              <img src={item.iconUrl} className="pin-image" alt="pin" />
            </div>
          </OverlayView>
        ))}

      </GoogleMap>

      <RecenterButton onClick={handleRecenterMap}><IonIcon icon={locate} /></RecenterButton>

      {/* Action Sheets e Cards ... */}
      <IonActionSheet
        isOpen={showPhotoOptions}
        header="Escolha uma opção"
        buttons={[
          { text: "Tirar foto", icon: "camera", handler: handleCameraOption },
          { text: "Escolher da galeria", icon: "images", handler: handleGalleryOption },
          { text: "Cancelar", icon: "close", role: "cancel" },
        ]}
        onDidDismiss={() => setShowPhotoOptions(false)}
      />    

      <RestaurantCard className={!!selected ? "show" : ""}>
        <CloseButton onClick={() => { setSelected(undefined); setShowInvoiceArea(false); }}><IonIcon icon={close} /></CloseButton>
        <RestaurantInfo>
          <RestaurantImage src={selected?.shop_photo_url || "/assets/default-photo.png"} alt={selected?.name} />
          <RestaurantDetails>
            {selected && (
              <>
                <h3>{selected?.name}</h3>
                <OpenStatus status={selected.status_open === "Aberto" ? "open" : selected.status_open === "Fechado" ? "closed" : undefined}>
                  {selected.status_open_details.status_open}
                </OpenStatus>
                <p>{selected.status_open_details.message}</p>
                <p>{selected?.addresses[0]?.street}, {selected?.addresses[0]?.number}</p>
                {userLoc && <p>Distância: {Math.round(getDistanceAndCheckin(selected).distance / 1000)} Km</p>}
              </>
            )}
            
            <ButtonsContainer>
              {selected && <ViewMoreButton onClick={() => { handleViewMore(selected.id); setSelected(undefined); }}>Ver mais sobre</ViewMoreButton>}
              {selected?.can_has_checkin && selected.is_checked_in_by_me_last_hour ? (
                <p>Você já realizou check-in!</p>
              ) : selected?.can_has_checkin ? (
                getDistanceAndCheckin(selected).canCheckin ? <CheckInButton onClick={() => handleCheckIn(selected.id)}>FAZER CHECK-IN</CheckInButton> : <p>Muito longe do local para fazer check-in.</p>
              ) : null}
              <Divider />
              <AlternativeLabel>Escanear com Qr Code ou Envio de Nota</AlternativeLabel>
              <ScanButton onClick={() => setShowInvoiceArea(true)}>ESCANEAR NOTA</ScanButton>       
              {selected?.can_has_purchase && showInvoiceArea && (                  
                  <InvoiceArea style={{ width: '100%' }}>
                      <br/>
                      <AlternativeSection style={{ flexDirection: 'row', textWrap: 'nowrap', width: '100%'  }}>
                        <ViewMoreButton onClick={() => handleScan(selected.id)} style={{ width: '50%', display: 'flex', flexDirection:'row', alignItems: 'center', justifyContent: 'center', gap: '0 4px' }}><IonIcon icon={qrCode} slot="start" /> QR CODE</ViewMoreButton>                           
                        <ViewMoreButton onClick={handleReceiptPhotoClick} style={{ width: '50%', display: 'flex', flexDirection:'row', alignItems: 'center', justifyContent: 'center' , gap: '0 4px' }}>Enviar recibo</ViewMoreButton>
                        <input type="file" ref={receiptPhotoFileRef} style={{ display: "none" }} onChange={handleReceiptPhotoChange} accept="image/*" />
                      </AlternativeSection>
                    <br />
                    {receiptPhotoUrl && (
                      <div style={{ marginTop: "12px", textAlign: "center" }}>
                        <img src={receiptPhotoUrl} alt="Foto" style={{ maxWidth: "200px", maxHeight: "200px", borderRadius: "8px", border: `2px solid ${color}` }} />
                        <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#666" }}>Foto selecionada!</p>
                        <SendNotaFiscalButton bg={color} onClick={handleInvoiceUpload} disabled={isUploadingInvoice} style={{ marginTop: "12px", opacity: isUploadingInvoice ? 0.6 : 1 }}>{isUploadingInvoice ? "Enviando..." : "Enviar Nota Fiscal"}</SendNotaFiscalButton>
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

export default AffiliatesMap;