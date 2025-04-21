import React, { useEffect } from 'react';
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
import { logout } from '../../services/auth-service';
import { Preferences } from '@capacitor/preferences';

interface SlideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlideMenu: React.FC<SlideMenuProps> = ({ isOpen, onClose }) => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

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

  const menuItems = [
    { label: 'Perfil', path: '/profile' },
    { label: 'Afiliados', path: '/affiliates' },
    { label: 'Meus Cupons', path: '/myvouchers' },
    { label: 'Troca de LupaCoins', path: '/home' },
    { label: 'Meu Plano', path: '/myplan' },
    { label: 'Meus Favoritos', path: '/home' },
    { label: 'Histórico', path: '/home' },
    { label: 'Indique e Ganhe', path: '/recommendandwin' },
    { label: 'Seja um Afiliado', path: '/affiliate/register' },
  ];

  return (
    <>
      <MenuOverlay $isOpen={isOpen} onClick={onClose} />
      <MenuContainer $isOpen={isOpen}>
        <CloseButton onClick={onClose}>
          <IonIcon icon={close} style={{ width: '25px', height: '25px' }} />
        </CloseButton>

        <MenuItems>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
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
          <IonIcon icon={logOut} style={{ width: '25px', height: '25px', marginLeft: '10px', marginRight: '2px' }} />
        </LogoutButton>
      </MenuContainer>
    </>
  );
};

export default SlideMenu;