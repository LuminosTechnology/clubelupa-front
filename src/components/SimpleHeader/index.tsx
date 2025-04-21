// src/components/SimpleHeader.tsx (ou onde você tiver este arquivo)
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  HeaderContainer,
  Title,
  MenuIcon,
  RightSpacer,
} from './header.style';

import { BackButton } from '../BackButton/backButton.style';
import arrowLeft from '../../assets/arrow-left.svg';
import defaultMenuIcon from '../../assets/Menu.svg';

import SlideMenu from '../SlideMenu';

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
  backgroundColor = '#F0F0EF',
  textColor = '#868950',
  showMenu = true,
  menuIcon = defaultMenuIcon,
  onBack,
}) => {
  const history = useHistory();
  const handleBack = onBack ?? (() => history.goBack());

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <HeaderContainer $bgColor={backgroundColor}>
        {/* botão voltar */}
        <BackButton src={arrowLeft} alt="Voltar" onClick={handleBack} />

        {/* título */}
        <Title $color={textColor}>{title}</Title>

        {/* menu hamburguer ou espaçador */}
        {showMenu ? (
          <MenuIcon
            src={menuIcon}
            alt="Menu"
            onClick={() => setIsMenuOpen(true)}
          />
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
