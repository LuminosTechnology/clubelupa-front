import React, { useEffect, useState } from "react";
import {
  MapContainer,
  MapWrapper,
  RestaurantCard,
  RestaurantDetails,
  RestaurantImage,
  RestaurantInfo,
  ViewMoreButton,
  CheckInButton,
  CheckInMessage,
  CloseButton,
} from "./map.style";
import { Geolocation } from "@capacitor/geolocation";
import { GoogleMap } from "@capacitor/google-maps";
import lupaMarker from "../../assets/comercio.svg";
import sampleImg from "../../assets/sample-store.png";
import { close, accessibilityOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

import { getAllAffiliates } from "../../services/affiliateService";
import { AffiliateData } from "../../services/interfaces/Affiliate";

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
}

/* -------------------------------------------------------------------------*/
interface MapProps {
  apiKey: string;
  onViewMore: (r: Restaurant) => void;
}

const Map: React.FC<MapProps> = ({ apiKey, onViewMore }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [userLoc, setUserLoc] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [selected, setSelected] = useState<Restaurant | null>(null);
  const [map, setMap] = useState<GoogleMap | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkInMessage, setCheckInMessage] = useState<string | null>(null);

  const DEFAULT_LOCATION = { lat: -25.4415, lng: -49.291 };
  const CHECKIN_RADIUS = 500; // m

  /* ─── carrega afiliados ───────────────────────────────────────────────── */
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const data = await getAllAffiliates();
  //       const full = data
  //         .filter((a) => extraById[a.id])
  //         .map<Restaurant>((a) => ({
  //           ...a,
  //           ...extraById[a.id],
  //           image: extraById[a.id].image ?? a.foto_perfil ?? sampleImg,
  //         }));
  //       setRestaurants(full);
  //     } catch (err) {
  //       console.error("[MAP] Falha ao carregar afiliados:", err);
  //     }
  //   })();
  // }, []);

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

  /* ─── inicia o mapa e marcadores ─────────────────────────────────────── */
  useEffect(() => {
    (async () => {
      if (!userLoc) return;

      const el = document.getElementById("map");
      if (!el) return;

      const gMap = await GoogleMap.create({
        id: "affiliates-map",
        element: el,
        apiKey,
        config: {
          center: userLoc,
          zoom: 15,
          disableDefaultUI: true,
          clickableIcons: false,
          styles: [
            {
              elementType: "all",
              stylers: [{ visibility: "off" }, { color: "#ff0000" }],
            },
          ],
        },
      });

      // marker do usuário
      // await gMap.addMarker({
      //   coordinate: userLoc,
      //   iconUrl: accessibilityOutline,
      //   iconSize: { width: 32, height: 32 },
      // });

      // markers dos afiliados
      // for (const r of restaurants) {
      //   await gMap.addMarker({
      //     coordinate: r.location,
      //     iconUrl: lupaMarker,
      //     iconSize: { width: 40, height: 40 },
      //   });
      // }

      // await gMap.setOnMarkerClickListener(async (m) => {
      //   const hit = restaurants.find(
      //     (r) => r.location.lat === m.latitude && r.location.lng === m.longitude
      //   );
      //   if (hit) {
      //     await gMap.setCamera({ coordinate: hit.location, animate: true });
      //     setSelected(hit);
      //     setCheckInMessage(null);
      //   }
      // });

      setMap(gMap);
    })();
  }, [userLoc, apiKey]);

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

  const handleCheckIn = () => {
    if (!selected || !userLoc) return;

    setLoading(true);
    const d = haversine(
      userLoc.lat,
      userLoc.lng,
      selected.location.lat,
      selected.location.lng
    );

    if (d <= CHECKIN_RADIUS) {
      setSelected({ ...selected, checkedIn: true });
      setCheckInMessage("✅ Check-in realizado!");
    } else {
      setCheckInMessage("❌ Você está muito longe.");
    }

    setLoading(false);
    setTimeout(() => setCheckInMessage(null), 3000);
  };

  /* ─── UI ─────────────────────────────────────────────────────────────── */
  return (
    <MapWrapper>
      <MapContainer id="map" />

      {selected && (
        <RestaurantCard>
          <CloseButton
            onClick={() => {
              setSelected(null);
              setCheckInMessage(null);
            }}
          >
            <IonIcon icon={close} />
          </CloseButton>

          {/* imagem de ponta a ponta */}
          <RestaurantInfo>
            <RestaurantImage
              src={selected.image}
              alt={selected.nome_fantasia}
            />
            <RestaurantDetails>
              <h3>{selected.nome_local || selected.nome_fantasia}</h3>
              <p>{selected.address}</p>
              <p>{selected.distance}</p>
              <p>{selected.hours}</p>
              <p>
                <strong>Vale {selected.value} pontos</strong>
              </p>
            </RestaurantDetails>
          </RestaurantInfo>

          <ViewMoreButton onClick={() => onViewMore(selected)}>
            Ver mais sobre
          </ViewMoreButton>

          {!selected.checkedIn && (
            <>
              <CheckInButton onClick={handleCheckIn} disabled={loading}>
                {loading ? "Carregando…" : "Check-in"}
              </CheckInButton>
              {checkInMessage && (
                <CheckInMessage>{checkInMessage}</CheckInMessage>
              )}
            </>
          )}

          {selected.checkedIn && (
            <CheckInMessage>✅ Check-in já realizado</CheckInMessage>
          )}
        </RestaurantCard>
      )}
    </MapWrapper>
  );
};

export default Map;
