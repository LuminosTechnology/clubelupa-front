/* ───────────────────────────────────────────────────────────────
 * src/pages/Map/index.tsx
 *   – mantém TODOS os campos do objeto original:
 *     id • name • address • distance • hours • image • location
 *     (e ainda traz category • schedule • benefits • color • img)
 * ─────────────────────────────────────────────────────────────── */
import React, { useEffect, useState } from 'react';
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
  CloseButton
} from './map.style';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';
import lupaMarker from '../../assets/lupa-search.svg';
import { close, accessibilityOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

/* -------------------------------------------------------------------------- */
/* 1. Mock original da lista (não mexemos nele)                               */
import {
  stores,   // id • name • category • schedule • benefits • color • img
  Store
} from '../../pages/AffiliateStores/AffiliateStoresPage';

/* 2. Complemento EXCLUSIVO do mapa – garante TODOS os campos                */
interface ExtraFields {
  address: string;
  distance: string;
  hours: string;
  image: string; // pode ser o mesmo img ou um diferente
  location: { lat: number; lng: number };
}

const extraById: Record<number, ExtraFields> = {
  1: {
    address: 'Rua Exemplo, 123',
    distance: '2.5 km',
    hours: 'Aberto agora • Fecha às 23:00',
    image:
      'https://img.freepik.com/premium-photo/journey-flavors_762785-327522.jpg?w=1060',
    location: { lat: -25.4415, lng: -49.291 }
  },
  2: {
    address: 'Av. Exemplo, 456',
    distance: '1.8 km',
    hours: 'Aberto agora • Fecha às 21:00',
    image:
      'https://img.freepik.com/premium-photo/journey-flavors_762785-327522.jpg?w=1060',
    location: { lat: -25.4352, lng: -49.3004 }
  },
  3: {
    address: 'Praça Exemplo, 789',
    distance: '3.1 km',
    hours: 'Aberto agora • Fecha às 20:00',
    image:
      'https://img.freepik.com/premium-photo/journey-flavors_762785-327522.jpg?w=1060',
    location: { lat: -25.4398, lng: -49.3201 }
  },
  4: {
    address: ' Av. Prof. Pedro Viriato Parigot de Souza, 5300',
    distance: '900 m',
    hours: 'Aberto agora • Fecha às 22:00', 
    image:
      'https://img.freepik.com/premium-photo/journey-flavors_762785-327522.jpg?w=1060',
    location: { lat: -25.4489, lng: -49.3558 }
  }
};

/* 3. Tipo completo para o mapa                                              */
interface Restaurant extends Store, ExtraFields {
  checkedIn?: boolean;
}

/* 4. Une mock + extras                                                      */
const restaurants: Restaurant[] = stores.map((s) => ({
  ...s,
  ...extraById[s.id]
}));

/* -------------------------------------------------------------------------- */
interface MapProps {
  apiKey: string;
}

const Map: React.FC<MapProps> = ({ apiKey }) => {
  const [userLoc, setUserLoc] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [selected, setSelected] = useState<Restaurant | null>(null);
  const [map, setMap] = useState<GoogleMap | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkInMessage, setCheckInMessage] = useState<string | null>(null);

  const DEFAULT_LOCATION = { lat: -25.4415, lng: -49.291 };
  const CHECKIN_RADIUS = 500; // m

  /* ─── localização ─────────────────────────────────────────────────── */
  useEffect(() => {
    (async () => {
      try {
        const { coords } = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true
        });
        setUserLoc({ lat: coords.latitude, lng: coords.longitude });
      } catch {
        setUserLoc(DEFAULT_LOCATION);
      }
    })();
  }, []);

  /* ─── mapa + marcadores ───────────────────────────────────────────── */
  useEffect(() => {
    (async () => {
      if (!userLoc) return;

      const el = document.getElementById('map');
      if (!el) return;

      const gMap = await GoogleMap.create({
        id: 'affiliates-map',
        element: el,
        apiKey,
        config: {
          center: userLoc,
          zoom: 15,
          disableDefaultUI: true,
          clickableIcons: false
        }
      });

      await gMap.addMarker({
        coordinate: userLoc,
        iconUrl: accessibilityOutline,
        iconSize: { width: 32, height: 32 }
      });

      for (const r of restaurants) {
        await gMap.addMarker({
          coordinate: r.location,
          iconUrl: lupaMarker,
          iconSize: { width: 40, height: 40 }
        });
      }

      await gMap.setOnMarkerClickListener(async (m) => {
        const hit = restaurants.find(
          (r) => r.location.lat === m.latitude && r.location.lng === m.longitude
        );
        if (hit) {
          await gMap.setCamera({ coordinate: hit.location, animate: true });
          setSelected(hit);
          setCheckInMessage(null);
        }
      });

      setMap(gMap);
    })();
  }, [userLoc, apiKey]);

  /* ─── check-in ─────────────────────────────────────────────────────── */
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
      setCheckInMessage('✅ Check-in realizado!');
    } else {
      setCheckInMessage('❌ Você está muito longe.');
    }

    setLoading(false);
    setTimeout(() => setCheckInMessage(null), 3000);
  };

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

  /* ─── UI ──────────────────────────────────────────────────────────── */
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

          <RestaurantInfo>
            <RestaurantImage src={selected.image} alt={selected.name} />
            <RestaurantDetails>
              <h3>{selected.name}</h3>
              <p>{selected.address}</p>
              <p>{selected.distance}</p>
              <p>{selected.hours}</p>
            </RestaurantDetails>
          </RestaurantInfo>

          <ViewMoreButton>Ver mais sobre</ViewMoreButton>

          {!selected.checkedIn && (
            <>
              <CheckInButton onClick={handleCheckIn} disabled={loading}>
                {loading ? 'Carregando…' : 'Check-in'}
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
