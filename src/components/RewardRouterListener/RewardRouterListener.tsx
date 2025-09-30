import { useEffect } from 'react';
import { useIonRouter } from '@ionic/react';
import { useGamificationContext } from '../../contexts/GamificationContext';

/**
 * Este componente não renderiza nada. Sua única função é ouvir o
 * GamificationContext e executar a navegação quando necessário.
 */
export const RewardRouterListener = () => {
  // useIonRouter funciona aqui, porque este componente estará DENTRO do Router
  const router = useIonRouter(); 
  
  const { postRewardRedirect, clearPostRewardRedirect } = useGamificationContext();

  useEffect(() => {
    // Se houver um caminho de redirecionamento definido...
    if (postRewardRedirect) {
      // Navegue para essa rota
      router.push(postRewardRedirect, 'forward', 'push');
      // E limpe o estado para não navegar novamente
      clearPostRewardRedirect();
    }
  }, [postRewardRedirect, router, clearPostRewardRedirect]);

  return null; // Este componente não tem UI
};