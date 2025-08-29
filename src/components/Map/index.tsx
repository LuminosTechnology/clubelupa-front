import { Geolocation } from "@capacitor/geolocation";
import { GoogleMap } from "@capacitor/google-maps";
import { IonIcon } from "@ionic/react";
import { close } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import {
  CloseButton,
  MapWrapper,
  RestaurantCard,
  RestaurantDetails,
  RestaurantImage,
  RestaurantInfo,
  ViewMoreButton,
} from "./map.style";

import { Capacitor } from "@capacitor/core";
import { useHistory } from "react-router";
import { useDebounce } from "../../hooks/useDebounce";
import { getAllEstablishments } from "../../services/affiliateService";
import { AffiliateData } from "../../services/interfaces/Affiliate";
import { Establishment } from "../../types/api/api";
import { haversine } from "../../utils/haversine";

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
          </RestaurantDetails>
        </RestaurantInfo>
      </RestaurantCard>
    </MapWrapper>
  );
};

export default Map;
