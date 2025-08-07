import { Geolocation } from "@capacitor/geolocation";
import { GoogleMap } from "@capacitor/google-maps";
import { IonIcon } from "@ionic/react";
import { close } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import {
  CheckInButton,
  CheckInMessage,
  CloseButton,
  MapWrapper,
  RestaurantCard,
  RestaurantDetails,
  RestaurantImage,
  RestaurantInfo,
  ViewMoreButton,
} from "./map.style";

import { affiliates } from "../../contexts/mock";
import { AffiliateData } from "../../services/interfaces/Affiliate";
import { Establishment } from "../../types/api/api";
import { getAllEstablishments } from "../../services/affiliateService";
import { useDebounce } from "../../hooks/useDebounce";

/* ---------------- extras específicos do mapa ------------------- */
interface ExtraFields {
  address: string;
  distance: string;
  hours: string;
  image: string;
  location: { lat: number; lng: number };
  value: number;
}

const extraById: Record<number, ExtraFields> = {
  1: {
    address: "Rua Exemplo, 123",
    distance: "2.5 km",
    hours: "Aberto agora • Fecha às 23:00",
    image:
      "https://img.freepik.com/premium-photo/journey-flavors_762785-327522.jpg?w=1060",
    location: { lat: -25.4415, lng: -49.291 },
    value: 150,
  },
};

/* ---------------- tipagens finais ----------------------------------------*/
export interface Restaurant extends AffiliateData, ExtraFields {
  checkedIn?: boolean;
  iconType: "green" | "terracotta" | "yellow";
  category?: string[];
  description?: string;
  structure?: "Física" | "Online";
}

/* -------------------------------------------------------------------------*/
interface MapProps {
  apiKey: string;
  onViewMore: (r: Restaurant) => void;
  searchValue: string;
}

const Map: React.FC<MapProps> = ({ apiKey, onViewMore, searchValue }) => {
  // const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [userLoc, setUserLoc] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const mapRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Establishment | undefined>();
  const [map, setMap] = useState<GoogleMap | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkInMessage, setCheckInMessage] = useState<string | null>(null);

  const [establishments, setEstablishments] = useState<Establishment[]>([]);

  const DEFAULT_LOCATION = { lat: -25.4415, lng: -49.291 };
  const CHECKIN_RADIUS = 5000000; // m

  /* ─── localização do usuário ─────────────────────────────────────────── */
  useEffect(() => {
    (async () => {
      try {
        const { coords } = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
        });
        setUserLoc({ lat: coords.latitude, lng: coords.longitude });
      } catch {
        setUserLoc(DEFAULT_LOCATION);
      }
    })();
  }, []);
  const debouncedSearchValue = useDebounce(searchValue, 300);

  useEffect(() => {
    const fetchEstablishments = async () => {
      const response = await getAllEstablishments(debouncedSearchValue);
      setEstablishments(response.data);
    };
    fetchEstablishments();
  }, [debouncedSearchValue]);

  /* ─── inicia o mapa e marcadores ─────────────────────────────────────── */
  useEffect(() => {
    const initMap = async () => {
      if (!userLoc) return;

      const el = mapRef.current;
      if (!el) return;

      if (establishments.length <= 0) return;

      console.log("mapRef.current", mapRef.current);
      console.log("typeof mapRef.current", typeof mapRef.current);
      console.log(
        "instanceof HTMLElement?",
        mapRef.current instanceof HTMLElement
      );

      const gMap = await GoogleMap.create({
        apiKey: "AIzaSyCADmNNz3iLtqV7UX-mY83WJnL6m3gpdkU",
        id: "affiliates-map",
        element: el,
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

      await gMap.enableCurrentLocation(true);

      // marker do usuário
      // await gMap.addMarker({
      //   coordinate: userLoc,
      //   iconUrl: accessibilityOutline,
      //   iconSize: { width: 32, height: 32 },
      // });

      // markers dos afiliados
      // for (const a of affiliates) {
      //   await gMap.addMarker({
      //     coordinate: a.location,
      //     iconUrl:
      //       a.iconType === "green"
      //         ? "assets/affiliate_pin.png"
      //         : a.iconType === "yellow"
      //         ? "assets/affiliate_shack.png"
      //         : "assets/affiliate_star.png",
      //     iconSize: { width: 40, height: 55 },
      //     iconAnchor: { x: 20, y: 55 },
      //   });
      // }

      for (const e of establishments) {
        if (e.addresses.length <= 0) continue;
        const address = e.addresses[0];
        const location = {
          lat: Number(address.latitude),
          lng: Number(address.longitude),
        };
        if (address) {
          await gMap.addMarker({
            coordinate: location,
            iconUrl: "assets/affiliate_pin.png",
            iconSize: { width: 40, height: 55 },
            iconAnchor: { x: 20, y: 55 },
          });
        }
      }

      await gMap.setOnMarkerClickListener(async (m) => {
        const hit = establishments.find(
          (e) =>
            Number(e.addresses[0].latitude) == m.latitude &&
            Number(e.addresses[0].longitude) == m.longitude
        );
        if (hit) {
          setSelected(hit);
          setCheckInMessage(null);
          await gMap.setCamera({
            coordinate: {
              lat: hit.addresses[0].latitude,
              lng: hit.addresses[0].longitude,
            },
            animate: true,
          });
        }
      });

      setMap(gMap);
    };

    const timeout = setTimeout(initMap, 300);

    return () => clearTimeout(timeout);
  }, [userLoc, apiKey, mapRef, establishments, debouncedSearchValue]);

  /* ─── check-in ───────────────────────────────────────────────────────── */
  const haversine = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371e3;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  // const handleCheckIn = () => {
  //   if (!selected || !userLoc) return;

  //   setLoading(true);
  //   const d = haversine(
  //     userLoc.lat,
  //     userLoc.lng,
  //     selected.addresses[0].latitude,
  //     selected.addresses[0].longitude
  //   );

  //   if (d <= CHECKIN_RADIUS) {
  //     setSelected({ ...selected, checkedIn: true });
  //     setCheckInMessage("✅ Check-in realizado!");
  //   } else {
  //     setCheckInMessage("❌ Você está muito longe.");
  //   }

  //   setLoading(false);
  //   setTimeout(() => setCheckInMessage(null), 3000);
  // };

  /* ─── UI ─────────────────────────────────────────────────────────────── */
  return (
    <MapWrapper>
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
            setCheckInMessage(null);
          }}
        >
          <IonIcon icon={close} />
        </CloseButton>

        {/* imagem de ponta a ponta */}
        <RestaurantInfo>
          <RestaurantImage
            src={selected?.cover_photo_url || "/assets/default-photo.png"}
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
                    {Math.round(
                      haversine(
                        userLoc?.lat,
                        userLoc?.lng,
                        selected!.addresses[0].latitude,
                        selected!.addresses[0].longitude
                      ) / 1000
                    )}
                    Km
                  </p>
                )}
                <p>Horário de funcionamento: </p>
              </>
            )}
            <p>
              <strong>Vale alguns pontos</strong>
            </p>
          </RestaurantDetails>
        </RestaurantInfo>

        {/* {selected && (
          <ViewMoreButton onClick={() => onViewMore(selected)}>
            Ver mais sobre
          </ViewMoreButton>
        )} */}

        {/* {!selected?.checkedIn && (
          <>
            <CheckInButton onClick={handleCheckIn} disabled={loading}>
              {loading ? "Carregando…" : "Check-in"}
            </CheckInButton>
            {checkInMessage && (
              <CheckInMessage>{checkInMessage}</CheckInMessage>
            )}
          </>
        )} */}
        {/* 
        {selected?.checkedIn && (
          <CheckInMessage>✅ Check-in já realizado</CheckInMessage>
        )} */}
      </RestaurantCard>
    </MapWrapper>
  );
};

export default Map;
