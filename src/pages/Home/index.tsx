import { IonContent, IonPage } from '@ionic/react';
import Header from '../../components/Header';
import Map from '../../components/Map';
import { useEffect, useState } from 'react';
import { getUserByToken } from '../../services/auth-service';
import Footer from '../../components/Footer';

interface User {
  id: number;
  nome_completo: string;
  data_nascimento: string;
  telefone: string;
  celular: string;
  cpf: string;
  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
  uf: string;
  email: string;
  created_at: string;

}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

if (!GOOGLE_MAPS_API_KEY) {
  console.warn('Google Maps API key is not defined in environment variables');
}

const Home: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserByToken();
        setUserData(user);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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
      <IonContent>
        <Header backgroundColor="var(--ion-color-primary)" />
        <Map
          apiKey={GOOGLE_MAPS_API_KEY}
          aria-label="Teste"
        />
        {userData && (
          <Footer userData={{
            nome_completo: userData.nome_completo,
            nivel: 1,
            experiencia: 750,
            proximo_nivel: 1000,
            created_at: userData.created_at,
          }} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;