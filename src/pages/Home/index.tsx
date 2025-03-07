import { IonContent, IonPage } from '@ionic/react';
import Header from '../../components/Header';
import Map from '../../components/Map';

const GOOGLE_MAPS_API_KEY = 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg';

const Home: React.FC = () => {
  return (
    <IonPage>
      <Header backgroundColor="var(--ion-color-primary)" />
      <IonContent>
        <Map apiKey={GOOGLE_MAPS_API_KEY} />
      </IonContent>
    </IonPage>
  );
};

export default Home;