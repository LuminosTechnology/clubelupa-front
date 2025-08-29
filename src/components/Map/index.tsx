import { Geolocation } from "@capacitor/geolocation";
import { GoogleMap } from "@capacitor/google-maps";
import { IonAlert, IonIcon } from "@ionic/react";
import { close } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import {
  ButtonsContainer,
  CloseButton,
  MapWrapper,
  RestaurantCard,
  RestaurantDetails,
  RestaurantImage,
  RestaurantInfo,
  CheckInScanButton,
  SeeMoreLink,
} from "./map.style";

import { Capacitor } from "@capacitor/core";
import { useHistory } from "react-router";
import { useDebounce } from "../../hooks/useDebounce";
import {
  doCheckIn,
  getAllEstablishments,
} from "../../services/affiliateService";
import { AffiliateData } from "../../services/interfaces/Affiliate";
import { Establishment } from "../../types/api/api";
import { haversine } from "../../utils/haversine";
import { CapacitorBarcodeScanner } from "@capacitor/barcode-scanner";
import { CodeScannerService } from "../../services/code-scan-service";
import { AxiosError } from "axios";
import { useGamificationContext } from "../../contexts/GamificationContext";

interface MapProps {
  onViewMore: (r: AffiliateData) => void;
  searchValue: string;
}

const ANDROID_API_KEY = "AIzaSyDoIWw3SXNki0nyFrJGoTjzHO5CkTqU1ms";
const IOS_API_KEY = "AIzaSyCGAcnhspK_rIozcUIXNX3Pe3DwpHMMaQc";
const HTTP_API_KEY = "AIzaSyCADmNNz3iLtqV7UX-mY83WJnL6m3gpdkU";

const Map: React.FC<MapProps> = ({ searchValue }) => {
  const history = useHistory();
  const [gMap, setGMap] = useState<GoogleMap | null>(null);
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
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [cantCheckIn, setCantCheckIn] = useState(false);

  const { refetchGamificationSummary } = useGamificationContext();

  const [checkinError, setCheckinError] = useState<string | undefined>();
  const [showCheckinError, setShowCheckinError] = useState(false);

  const DEFAULT_LOCATION = { lat: -25.4415, lng: -49.291 };

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
    if (!userLoc || gMap) return;

    const initMap = async () => {
      if (!mapRef.current) return;
      console.log("Inicializando mapa...");

      const newMap = await GoogleMap.create({
        apiKey: apiKey(),
        id: "affiliates-map",
        element: mapRef.current,
        config: {
          androidLiteMode: false,
          center: userLoc,
          zoom: 11,
          disableDefaultUI: true,
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

      await newMap.enableCurrentLocation(true);

      setGMap(newMap);
    };

    initMap();
  }, [userLoc, gMap]);

  /* ─── Adicionar/Remover Marcadores (nova lógica) ────────────────────── */
  useEffect(() => {
    if (!gMap || establishments.length === 0) return;

    const updateMarkers = async () => {
      console.log("Atualizando marcadores...");
      // Remova os marcadores existentes
      const markersIds = Object.keys(markerMapRef.current);
      if (markersIds.length > 0) {
        await gMap.removeMarkers(markersIds);
      }
      await gMap.removeAllMapListeners();
      // Limpe o objeto de referência
      markerMapRef.current = {};

      await Promise.all(
        establishments.map(async (e) => {
          if (!e.addresses.length) return;
          if (
            e.addresses[0].latitude === null ||
            e.addresses[0].longitude === null
          )
            return;
          const location = {
            lat: Number(e.addresses[0].latitude),
            lng: Number(e.addresses[0].longitude),
          };
          const markerId = await gMap.addMarker({
            coordinate: location,
            iconUrl: "assets/affiliate_pin.png",
            iconSize: { width: 40, height: 55 },
            iconAnchor: { x: 20, y: 55 },
          });

          const id = markerId || e.id;
          markerMapRef.current[id] = e;
          console.log(markerMapRef.current);
        })
      );

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
          setCheckinError(message);
          setShowCheckinError(true);
        }
      }
      console.error("Erro ao fazer check-in:", e);
    }
  };

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
      <capacitor-google-map
        ref={mapRef}
        id="map"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      ></capacitor-google-map>

      <RestaurantCard className={!!selected ? "show" : ""}>
        <CloseButton
          onClick={() => {
            setSelected(undefined);
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
                <p>
                  {selected?.addresses[0]?.street},{" "}
                  {selected?.addresses[0]?.number}
                </p>
                {userLoc && (
                  <p>
                    Distância:{" "}
                    {Math.round(
                      haversine(
                        userLoc?.lat,
                        userLoc?.lng,
                        selected!.addresses[0].latitude,
                        selected!.addresses[0].longitude
                      ) / 1000
                    )}{" "}
                    Km
                  </p>
                )}
              </>
            )}
            {(selected?.can_has_checkin || selected?.can_has_purchase) && (
              <ButtonsContainer>
                <CheckInScanButton
                  onClick={() => handleCheckIn(selected.id)}
                  disabled={selected.is_checked_in_by_me_last_hour}
                >
                  CHECK-IN
                </CheckInScanButton>
                <CheckInScanButton onClick={() => handleScan(selected.id)}>
                  ESCANEAR NOTA
                </CheckInScanButton>
              </ButtonsContainer>
            )}
            {selected && (
              <SeeMoreLink
                onClick={() => {
                  handleViewMore(selected.id);
                  setSelected(undefined);
                }}
              >
                Ver mais sobre
              </SeeMoreLink>
            )}
          </RestaurantDetails>
        </RestaurantInfo>
      </RestaurantCard>
    </MapWrapper>
  );
};

export default Map;
