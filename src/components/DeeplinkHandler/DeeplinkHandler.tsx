import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { App as CapacitorApp } from '@capacitor/app';

const DeeplinkHandler: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    // Adiciona o listener quando o componente é montado
    const listener = CapacitorApp.addListener('appUrlOpen', (event) => {
      // O Capacitor nos dá a URL completa, ex: "clubelupa://register?referral_code=XYZ"
      const url = new URL(event.url);
      const referralCode = url.searchParams.get('referral_code');

      // Verificamos se a URL é para a tela de registro e se contém o código
      if (url.pathname.includes('register') && referralCode) {
        history.push(`/register?referral_code=${referralCode}`);
      }
    });

    // Função de limpeza: remove o listener quando o componente é desmontado
    // para evitar vazamentos de memória.
    return () => {
      listener.remove();
    };
  }, [history]);

  return null;
};

export default DeeplinkHandler;