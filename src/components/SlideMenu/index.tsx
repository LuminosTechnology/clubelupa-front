/* ──────────────────────────────────────────────────────────────
 * src/components/SlideMenu/SlideMenu.tsx
 * ────────────────────────────────────────────────────────────── */
import { Preferences } from "@capacitor/preferences";
import { IonIcon } from "@ionic/react";
import { close, logOut } from "ionicons/icons";
import React, { useEffect, useMemo, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { logout } from "../../services/auth-service";
import {
  CloseButton,
  LogoutButton,
  MenuContainer,
  MenuItem,
  MenuItems,
  MenuOverlay,
} from "./SlideMenu.style";
import { LOCAL_STORAGE_KEYS } from "../../config/constants";

interface SlideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlideMenu: React.FC<SlideMenuProps> = ({ isOpen, onClose }) => {
  const history = useHistory();
  const location = useLocation();
  const { setIsAuthenticated, user, setUser } = useAuthContext();

  /* ---------- fecha menu quando a rota mudar ----------------- */
  const prevPath = useRef(location.pathname);
  useEffect(() => {
    if (prevPath.current !== location.pathname && isOpen) {
      onClose();
    }
    prevPath.current = location.pathname;
  }, [location.pathname, isOpen, onClose]);

  /* ---------- logout ----------------------------------------- */
  const handleLogout = async () => {
    try {
      await logout();
      history.replace("/login");
      setIsAuthenticated(false);
      setUser(undefined);
    } catch (e) {
      console.error("Logout error:", e);
    } finally {
      await Preferences.remove({ key: LOCAL_STORAGE_KEYS.AUTH_TOKEN });
      onClose();
    }
  };

  /* ---------- itens do menu ---------------------------------- */
  const menuItems = useMemo(() => {
    const base = [
      { label: "Home", path: "/home", enabled: true },
      { label: "Perfil", path: "/profile", enabled: true },
      { label: "Afiliados", path: "/affiliates", enabled: true },
      { label: "Troca de Moedas Lupa", path: "/lupacoins", enabled: false },
      { label: "Meu Plano", path: "/myplan", enabled: true },
      { label: "Meus Favoritos", path: "/favorites", enabled: true },
      { label: "Histórico", path: "/experience", enabled: false },
      { label: "Indique e Ganhe", path: "/recommendandwin", enabled: false },
    ];

    if (user?.is_affiliate) {
      base.push({
        label: "Área do Afiliado",
        path: "/affiliate/area",
        enabled: true,
      });
    } else {
      base.push({
        label: "Seja um Afiliado",
        path: "/affiliate/paywall",
        enabled: true,
      });
    }

    return base;
  }, [user, location.pathname]);

  /* ---------- render ----------------------------------------- */
  return (
    <>
      <MenuOverlay $isOpen={isOpen} onClick={onClose} />

      <MenuContainer $isOpen={isOpen}>
        {/* botão de fechar */}
        <CloseButton onClick={onClose}>
          <IonIcon icon={close} style={{ width: 25, height: 25 }} />
        </CloseButton>

        {/* links do slide menu */}
        <MenuItems>
          {menuItems.map((item) => (
            <MenuItem
              enabled={item.enabled}
              key={item.path}
              onClick={() => {
                const isHome = history.location.pathname === "/home";
                if (item.enabled) {
                  if (isHome) {
                    history.push(item.path);
                  } else {
                    history.replace(item.path);
                  }
                  onClose();
                }
              }}
            >
              {item.label}
              {!item.enabled && (
                <IonIcon
                  name="lock-closed"
                  style={{ width: 16, height: 16, marginLeft: 10 }}
                />
              )}
            </MenuItem>
          ))}
        </MenuItems>

        {/* botão de logout */}
        <LogoutButton onClick={handleLogout}>
          Desconectar
          <IonIcon
            icon={logOut}
            style={{ width: 25, height: 25, marginLeft: 10 }}
          />
        </LogoutButton>
      </MenuContainer>
    </>
  );
};

export default SlideMenu;
