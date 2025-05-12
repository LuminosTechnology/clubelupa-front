// src/components/SlideMenu/SlideMenu.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { IonIcon } from '@ionic/react';
import { close, logOut } from 'ionicons/icons';
import {
  MenuOverlay,
  MenuContainer,
  CloseButton,
  MenuItems,
  MenuItem,
  LogoutButton,
} from './SlideMenu.style';
import { useHistory, useLocation } from 'react-router-dom';
import { logout, getUserByToken } from '../../services/auth-service';
import { Preferences } from '@capacitor/preferences';
import { User } from '../../services/interfaces/Auth';

interface SlideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlideMenu: React.FC<SlideMenuProps> = ({ isOpen, onClose }) => {
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [isAffiliate, setIsAffiliate] = useState(false);

  // Close menu on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  // Load user and detect affiliate status
  useEffect(() => {
    (async () => {
      try {
        const fetched = await getUserByToken();
        setUser(fetched);
        // supondo que a API retorne um campo `is_affiliate: boolean`
        setIsAffiliate(!!(fetched as any).is_affiliate);
      } catch (err) {
        console.error('Erro ao buscar dados do usuário', err);
      }
    })();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await Preferences.remove({ key: 'auth_token' });
      onClose();
      history.replace('/login');
    }
  };

  // Monta itens de menu dinamicamente
  const menuItems = useMemo(() => {
    const items = [
      { label: 'Home', path: '/home' },
      { label: 'Perfil', path: '/profile' },
      { label: 'Afiliados', path: '/affiliates' },
      { label: 'Troca de LupaCoins', path: '/lupacoins' },
      { label: 'Meu Plano', path: '/myplan' },
      { label: 'Meus Favoritos', path: '/favorites' },
      { label: 'Histórico', path: '/experience' },
      { label: 'Indique e Ganhe', path: '/recommendandwin' },
    ];

    if (isAffiliate) {
      // Se já é afiliado, mostra "Área do Afiliado"
      items.push({ label: 'Área do Afiliado', path: '/affiliate/area' });
    } else {
      // Se não for afiliado, mostra "Seja um Afiliado"
      items.push({ label: 'Seja um Afiliado', path: '/affiliate/register' });
    }

    return items;
  }, [isAffiliate]);

  return (
    <>
      <MenuOverlay $isOpen={isOpen} onClick={onClose} />
      <MenuContainer $isOpen={isOpen}>
        <CloseButton onClick={onClose}>
          <IonIcon icon={close} style={{ width: '25px', height: '25px' }} />
        </CloseButton>

        <MenuItems>
          {menuItems.map((item, idx) => (
            <MenuItem
              key={idx}
              onClick={() => {
                history.push(item.path);
                onClose();
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </MenuItems>

        <LogoutButton onClick={handleLogout}>
          Desconectar
          <IonIcon
            icon={logOut}
            style={{ width: '25px', height: '25px', marginLeft: 10 }}
          />
        </LogoutButton>
      </MenuContainer>
    </>
  );
};

export default SlideMenu;
