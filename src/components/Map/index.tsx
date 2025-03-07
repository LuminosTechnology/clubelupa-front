import React, { useEffect, useState } from 'react';
import { MapContainer, MapWrapper, RestaurantCard, RestaurantDetails, RestaurantImage, RestaurantInfo, ViewMoreButton } from './map.style';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';
import lupaMarker from '../../assets/lupa-search.svg';

interface Restaurant {
  id: string;
  name: string;
  address: string;
  distance: string;
  hours: string;
  image: string;
  location: {
    lat: number;
    lng: number;
  };
}

interface MapProps {
  apiKey: string;
}

const Map: React.FC<MapProps> = ({ apiKey }) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [map, setMap] = useState<GoogleMap | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{ x: number; y: number } | null>(null);
  const DEFAULT_LOCATION = { lat: -25.4284, lng: -49.2733 };

  // Get current location
  useEffect(() => {
    const getCurrentPosition = async () => {
      try {
        const coordinates = await Geolocation.getCurrentPosition();
        setLocation({
          lat: coordinates.coords.latitude,
          lng: coordinates.coords.longitude
        });
      } catch (error) {
        console.warn('Error getting location, using default:', error);
        setLocation(DEFAULT_LOCATION);
      }
    };

    getCurrentPosition();
  }, []);

  // Example restaurants data
  const restaurants: Restaurant[] = [
    {
      id: '1',
      name: 'Restaurante Exemplo',
      address: 'Rua Exemplo, 123',
      distance: '2.5 km',
      hours: 'Aberto agora • Fecha às 23:00',
      image: 'https://img.freepik.com/premium-photo/journey-flavors_762785-327522.jpg?w=1060',
      location: { lat: -25.48479, lng: -49.30285 }
    }
  ];

  useEffect(() => {
    const createMap = async () => {
      if (!location) return;

      const mapElement = document.getElementById('map');
      if (!mapElement) return;

      const newMap = await GoogleMap.create({
        id: 'map-1',
        element: mapElement,
        apiKey: apiKey,
        config: {
          center: location,
          zoom: 15,
          styles: [
            {
              featureType: "poi",
              elementType: "all",
              stylers: [{ visibility: "off" }]
            }
          ],
          disableDefaultUI: true,
          clickableIcons: false
        }
      });

      // Add markers
      for (const restaurant of restaurants) {
        await newMap.addMarker({
          coordinate: restaurant.location,
          iconUrl: lupaMarker,
          iconSize: { width: 48, height: 48 }
        });
      }

      // Handle marker clicks
      await newMap.setOnMarkerClickListener(async (marker) => {
        const clicked = restaurants.find(r =>
          r.location.lat === marker.latitude &&
          r.location.lng === marker.longitude
        );

        if (clicked) {
          await newMap.setCamera({
            coordinate: clicked.location,
            animate: true
          });
          setSelectedRestaurant(clicked);
        }
      });

      setMap(newMap);
    };

    createMap();
  }, [location, apiKey]);

  return (
    <MapWrapper>
      <MapContainer id="map" />
      {selectedRestaurant && (
        <RestaurantCard>
          <RestaurantInfo>
            <RestaurantImage
              src={selectedRestaurant.image}
              alt={selectedRestaurant.name}
            />
            <RestaurantDetails>
              <h3>{selectedRestaurant.name}</h3>
              <p>{selectedRestaurant.address}</p>
              <p>{selectedRestaurant.distance}</p>
              <p>{selectedRestaurant.hours}</p>
            </RestaurantDetails>
          </RestaurantInfo>
          <ViewMoreButton>
            Ver mais sobre
          </ViewMoreButton>
        </RestaurantCard>
      )}
    </MapWrapper>
  );
};

export default Map;