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
    await logout();
    onClose();
    history.push('/login');
  };

  const menuItems = [
    { label: 'Início', path: '/home' },
    { label: 'Perfil', path: '/profile' },
    { label: 'Configurações', path: '/settings' },
    // Add more menu items as needed
  ];

  return (
    <>
      <MenuOverlay $isOpen={isOpen} onClick={onClose} />
      <MenuContainer $isOpen={isOpen}>
        <CloseButton onClick={onClose}>
          <IonIcon icon={close} />
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
          <IonIcon icon={logOut} style={{ width: '28px' }} />
        </LogoutButton>
      </MenuContainer>
    </>
  );
};

export default SlideMenu;