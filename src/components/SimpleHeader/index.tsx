import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  HeaderContainer,
  Title,
  MenuIcon,
  RightSpacer,  
} from "./header.style";

import useDeviceDetection from "../../hooks/useDeviceDetection";

import { MenuIconWrapper } from "../Header/components/notificationIcon.style";

import { NotificationBadge } from "../Header/components/notificationIcon";

import { BackButton } from "../BackButton/backButton.style";
import arrowLeft from "../../assets/arrow-left.svg";
import defaultMenuIcon from "../../assets/Menu.svg";

import SlideMenu from "../SlideMenu";
import { useNavigationContext } from "../../contexts/NavigationContext";

export interface AppHeaderProps {
  title: string;
  backgroundColor?: string;
  textColor?: string;
  /** Mostrar ou não o menu hamburguer (padrão = true) */
  showMenu?: boolean;
  /** Caminho do ícone do menu hamburguer (opcional; padrão = defaultMenuIcon) */
  menuIcon?: string;
  /** Ação personalizada do botão voltar (opcional) */
  onBack?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  backgroundColor = "#F0F0EF",
  textColor = "#868950",
  showMenu = true,
  menuIcon = defaultMenuIcon,
  onBack,
}) => {
  const history = useHistory();
  const location = useLocation();
  const { isMainMenuNavigation, mainMenuRoutes, setIsMainMenuNavigation } = useNavigationContext();
  const { isIOSLike } = useDeviceDetection();

  // Resetar o estado de navegação do menu principal quando não estivermos em uma rota do menu principal
  useEffect(() => {
    if (!mainMenuRoutes.includes(location.pathname)) {
      setIsMainMenuNavigation(false);
    } else {
      // Se estamos em uma rota do menu principal, redefinir o estado para true
      setIsMainMenuNavigation(true);
    }
  }, [location.pathname, mainMenuRoutes, setIsMainMenuNavigation]);

  const handleBack = onBack ?? (() => {
    // Se estivermos navegando entre páginas do menu principal, sempre voltar para Home
    if (isMainMenuNavigation && mainMenuRoutes.includes(location.pathname)) {
      history.push("/home");
    } else {
      history.goBack();
    }
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <HeaderContainer $bgColor={backgroundColor} $isIOSLike={isIOSLike}>
        {/* botão voltar */}
        <BackButton src={arrowLeft} alt="Voltar" onClick={handleBack} />

        {/* título */}
        <Title $color={textColor}>{title}</Title>

        {/* menu hamburguer ou espaçador */}
        {showMenu ? (
          <MenuIconWrapper>
            <NotificationBadge />
            <MenuIcon
              src={menuIcon}
              alt="Menu"
              onClick={() => setIsMenuOpen(true)}
            />
          </MenuIconWrapper>
        ) : (
          <RightSpacer />
        )}
      </HeaderContainer>

      {/* slide‑out menu */}
      {showMenu && (
        <SlideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      )}
    </>
  );
};

export default AppHeader;
