import { IonContent, IonPage } from '@ionic/react';
import Header from '../../components/Header';
import Map from '../../components/Map';
import { useEffect } from 'react';

const GOOGLE_MAPS_API_KEY = import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';

if (!GOOGLE_MAPS_API_KEY) {
  console.warn('Google Maps API key is not defined in environment variables');
}

const Home: React.FC = () => {
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'aria-hidden') {
          const element = mutation.target as HTMLElement;
          element.removeAttribute('aria-hidden');
        }
      });
    });

    const mapElement = document.getElementById('map');
    if (mapElement) {
      observer.observe(mapElement, {
        attributes: true,
        subtree: true,
        childList: true
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <IonPage>
      <Header backgroundColor="var(--ion-color-primary)" />
      <IonContent>
        <Map
          apiKey={GOOGLE_MAPS_API_KEY}
          aria-label="Teste"
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;