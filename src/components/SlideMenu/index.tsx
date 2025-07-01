/* ──────────────────────────────────────────────────────────────
 * src/components/SlideMenu/SlideMenu.tsx
 * ────────────────────────────────────────────────────────────── */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { IonIcon } from "@ionic/react";
import { close, logOut } from "ionicons/icons";
import {
  MenuOverlay,
  MenuContainer,
  CloseButton,
  MenuItems,
  MenuItem,
  LogoutButton,
} from "./SlideMenu.style";
import { useHistory, useLocation } from "react-router-dom";
import { logout, getUserByToken } from "../../services/auth-service";
import { getMyFirstAffiliate } from "../../services/affiliateService";
import { Preferences } from "@capacitor/preferences";
import type { User } from "../../services/interfaces/Auth";

interface SlideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlideMenu: React.FC<SlideMenuProps> = ({ isOpen, onClose }) => {
  const history = useHistory();
  const location = useLocation();

  const [user, setUser] = useState<User | null>(null);
  // undefined = carregando | false = sem afiliado | true = tem afiliado
  const [hasAffiliate, setHasAffiliate] = useState<boolean | undefined>();

  /* ---------- fecha menu quando a rota mudar ----------------- */
  const prevPath = useRef(location.pathname);
  useEffect(() => {
    if (prevPath.current !== location.pathname && isOpen) {
      onClose();
    }
    prevPath.current = location.pathname;
  }, [location.pathname, isOpen, onClose]);

  /* ---------- carrega usuário + status de afiliado ------------ */
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const fetchedUser = await getUserByToken();
        if (mounted) setUser(fetchedUser);

        const affiliate = await getMyFirstAffiliate();
        if (mounted) setHasAffiliate(!!affiliate); // true | false
      } catch (err) {
        console.error("[SlideMenu] Erro ao carregar dados:", err);
        if (mounted) setHasAffiliate(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  /* ---------- logout ----------------------------------------- */
  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error("Logout error:", e);
    } finally {
      await Preferences.remove({ key: "auth_token" });
      onClose();
      history.replace("/login");
    }
  };

  /* ---------- itens do menu ---------------------------------- */
  const menuItems = useMemo(() => {
    const base = [
      { label: "Home", path: "/home" },
      { label: "Perfil", path: "/profile" },
      { label: "Afiliados", path: "/affiliates" },
      { label: "Troca de LupaCoins", path: "/lupacoins" },
      { label: "Meu Plano", path: "/myplan" },
      { label: "Meus Favoritos", path: "/favorites" },
      { label: "Histórico", path: "/experience" },
      { label: "Indique e Ganhe", path: "/recommendandwin" },
    ];

    // Enquanto carrega, mostramos um placeholder
    if (hasAffiliate === undefined) {
      return base.concat({ label: "Carregando…", path: location.pathname });
    }

    // Após carregado, acrescenta o item correto
    return hasAffiliate
      ? base.concat({ label: "Área do Afiliado", path: "/affiliate/area" })
      : base.concat({ label: "Seja um Afiliado", path: "/affiliate/register" });
  }, [hasAffiliate, location.pathname]);

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
              key={item.path}
              onClick={() => {
                history.push(item.path);
                onClose();
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </MenuItems>

        {/* botão de logout */}
        <LogoutButton onClick={handleLogout}>
          Desconectar
          <IonIcon icon={logOut} style={{ width: 25, height: 25, marginLeft: 10 }} />
        </LogoutButton>
      </MenuContainer>
    </>
  );
};

export default SlideMenu;
