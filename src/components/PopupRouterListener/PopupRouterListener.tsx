import { useEffect } from 'react';
import { useIonRouter } from '@ionic/react';


import { usePopupContext } from '../../contexts/PopupContext'; 

/**
 * Este componente não renderiza nenhuma UI.
 * Sua única responsabilidade é "ouvir" por uma intenção de navegação
 * no PopupContext e executar a navegação quando ela aparecer.
 */
export const PopupRouterListener = () => {
  
  const router = useIonRouter();
  
  const { postPopupRedirect, clearPostPopupRedirect } = usePopupContext();

  
  useEffect(() => {
    
    if (postPopupRedirect) {
      
      router.push(postPopupRedirect, 'forward', 'push');
      
      clearPostPopupRedirect();
    }
  }, [postPopupRedirect, router, clearPostPopupRedirect]); 

  return null;
};