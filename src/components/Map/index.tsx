import React, { useEffect, useState } from 'react';
import { MapContainer, MapWrapper, RestaurantCard, RestaurantDetails, RestaurantImage, RestaurantInfo, ViewMoreButton, CheckInButton, CheckInMessage, CloseButton } from './map.style';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';
import lupaMarker from '../../assets/lupa-search.svg';
import { star, close, accessibilityOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { dayTheme, nightTheme } from './mapThemes';

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
  checkedIn?: boolean;
}

interface MapProps {
  apiKey: string;
}

const Map: React.FC<MapProps> = ({ apiKey }) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [map, setMap] = useState<GoogleMap | null>(null);
  const [loading, setLoading] = useState(false);
  const DEFAULT_LOCATION = { lat: -25.4284, lng: -49.2733 };

  const [checkInMessage, setCheckInMessage] = useState<string | null>(null);

  // Get current location
  useEffect(() => {
    const getCurrentPosition = async () => {
      try {
        const coordinates = await Geolocation.getCurrentPosition();
        const userLocation = {
          lat: coordinates.coords.latitude,
          lng: coordinates.coords.longitude
        };
        console.log('User location:', userLocation);
        setLocation(userLocation);
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
    },
    {
      id: '2',
      name: 'Restaurante Exemplo',
      address: 'Rua Exemplo, 123',
      distance: '2.5 km',
      hours: 'Aberto agora • Fecha às 23:00',
      image: 'https://img.freepik.com/premium-photo/journey-flavors_762785-327522.jpg?w=1060',
      location: { lat: -25.48469, lng: -49.3385 }
    },
    {
      id: '3',
      name: 'Restaurante Exemplo',
      address: 'Rua Exemplo, 123',
      distance: '2.5 km',
      hours: 'Aberto agora • Fecha às 23:00',
      image: 'https://img.freepik.com/premium-photo/journey-flavors_762785-327522.jpg?w=1060',
      location: { lat: -25.49469, lng: -49.4585 }
    },
    {
      id: '4',
      name: 'Teste Novo',
      address: 'Rua Nova, 456',
      distance: '1.2 km',
      hours: 'Aberto agora • Fecha às 22:00',
      image: 'https://img.freepik.com/premium-photo/journey-flavors_762785-327522.jpg?w=1060',
      location: { lat: -25.507582, lng: -49.354845 }
    }
  ];

  const isDayTime = () => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18;
  };

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
          styles: isDayTime() ? dayTheme : nightTheme,
          disableDefaultUI: true,
          clickableIcons: false
        }
      });

      await newMap.setOnCameraMoveStartedListener(() => {
        setSelectedRestaurant(null);
        setCheckInMessage(null); // Clear message when moving the map
      });

      // Add markers
      for (const restaurant of restaurants) {
        await newMap.addMarker({
          coordinate: restaurant.location,
          iconUrl: lupaMarker,
          iconSize: { width: 48, height: 48 }
        });
      }

      // Add current location marker with Ionic star icon
      await newMap.addMarker({
        coordinate: location,
        iconUrl: accessibilityOutline,
        iconSize: { width: 32, height: 32 }
      });

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
          setCheckInMessage(null); // Clear message when switching cards
        }
      });

      setMap(newMap);
    };

    createMap();
  }, [location, apiKey]);

  const handleCheckIn = async () => {
    if (!selectedRestaurant || !location) return;

    setLoading(true);
    const distance = getDistanceFromLatLonInMeters(
      location.lat,
      location.lng,
      selectedRestaurant.location.lat,
      selectedRestaurant.location.lng
    );

    if (distance <= 100) {
      // setSelectedRestaurant({ ...selectedRestaurant, checkedIn: true }); // Update restaurant state
      setCheckInMessage('Check-in realizado!');
    } else {
      setCheckInMessage('Você está muito longe.');
    }

    setLoading(false);
    setTimeout(() => setCheckInMessage(null), 3000); // Clear message after 3 seconds
  };

  const getDistanceFromLatLonInMeters = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // Radius of the earth in meters
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters
    return distance;
  };

  const handleCloseCard = () => {
    setSelectedRestaurant(null);
    setCheckInMessage(null);
  };

  return (
    <MapWrapper>
      <MapContainer id="map" />
      {selectedRestaurant && (
        <RestaurantCard>
          <CloseButton onClick={handleCloseCard}>
            <IonIcon icon={close} />
          </CloseButton>
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
          {!selectedRestaurant.checkedIn && (
            <>
              <CheckInButton onClick={handleCheckIn} disabled={loading}>
                {loading ? 'Loading...' : 'Check-In'}
              </CheckInButton>
              {checkInMessage && <CheckInMessage>{checkInMessage}</CheckInMessage>}
            </>
          )}
        </RestaurantCard>
      )}
    </MapWrapper>
  );
};

export default Map;