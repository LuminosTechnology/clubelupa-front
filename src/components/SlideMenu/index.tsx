/* ──────────────────────────────────────────────────────────────
 * src/components/SlideMenu/SlideMenu.tsx
 * ────────────────────────────────────────────────────────────── */
import { Preferences } from "@capacitor/preferences";
import { IonIcon, useIonRouter } from "@ionic/react";
import { close, logOut } from "ionicons/icons";
import React, { useEffect, useMemo, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { LOCAL_STORAGE_KEYS } from "../../config/constants";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigationContext } from "../../contexts/NavigationContext";
import { useSubscriptionAlert } from "../../hooks/useSubscriptionAlert";
import { logout } from "../../services/auth-service";
import {
  CloseButton,
  LogoutButton,
  MenuContainer,
  MenuItem,
  MenuItems,
  MenuOverlay,
} from "./SlideMenu.style";

import { NotificationBadge } from "../../components/Header/components/notificationIcon";
import { MenuIconWrapper } from "../../components/Header/components/notificationIcon.style";

interface SlideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlideMenu: React.FC<SlideMenuProps> = ({ isOpen, onClose }) => {
  const history = useHistory();
  const location = useLocation();
  const { setIsAuthenticated, user, setUser } = useAuthContext();
  const { setIsMainMenuNavigation } = useNavigationContext();
  const { checkAndShowAlert } = useSubscriptionAlert();

  /* ---------- fecha menu quando a rota mudar ----------------- */
  const prevPath = useRef(location.pathname);
  useEffect(() => {
    if (prevPath.current !== location.pathname && isOpen) {
      onClose();
    }
    prevPath.current = location.pathname;
  }, [location.pathname, isOpen, onClose]);

  const router = useIonRouter();
  /* ---------- logout ----------------------------------------- */
  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
      setUser(undefined);

      await Preferences.remove({ key: LOCAL_STORAGE_KEYS.AUTH_TOKEN });

      router.push("/login", "root");
    } catch (e) {
      console.error("Logout error:", e);
    } finally {
      onClose();
    }
  };

  /* ---------- itens do menu ---------------------------------- */
  const menuItems = useMemo(() => {
    const base = [
      { label: "Home", path: "/home", enabled: true },
      { label: "Perfil", path: "/profile", enabled: true },
      { label: "Notificações", path: "/profile/notifications", enabled: true },
      { label: "Afiliados", path: "/affiliates", enabled: true },
      { label: "Troca de Moedas Lupa", path: "/lupacoins", enabled: true },
      { label: "Meu Plano", path: "/myplan", enabled: true },
      { label: "Meus Favoritos", path: "/favorites", enabled: true },
      { label: "Histórico", path: "/experience", enabled: true },
      { label: "Indique e Ganhe", path: "/recommendandwin", enabled: true },
    ];

    if (user?.is_affiliate && user.is_payed) {
      base.push({
        label: "Área do Afiliado",
        path: "/affiliate/area",
        enabled: true,
      });
    } else if (user?.is_affiliate && !user.is_payed) {
      base.push({
        label: "Ativar Assinatura",
        path: "/myplan",
        enabled: true,
      });
    } else {
      base.push({
        label: "Seja um Afiliado",
        path: "/affiliate/become",
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
                if (item.enabled) {
                  // Verificar se é a Área do Afiliado e se deve ser bloqueada
                  if (item.path === "/affiliate/area") {
                    const establishment = user?.establishments?.[0];
                    if (
                      user?.is_affiliate &&
                      !user.is_payed &&
                      establishment?.approved_status === "2"
                    ) {
                      checkAndShowAlert(true);
                      onClose();
                      return;
                    }
                  }

                  // Marcar que estamos navegando entre páginas do menu principal
                  setIsMainMenuNavigation(true);
                  history.push(item.path);
                  onClose();
                }
              }}
            >
              {item.label == 'Notificações' ? (
                <MenuIconWrapper>
                  {item.label}
                  <NotificationBadge variant="menu" />
                </MenuIconWrapper>
              ) : item.label}

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
