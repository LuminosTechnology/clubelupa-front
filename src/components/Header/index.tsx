import React, { useState } from 'react';
import { HeaderContainer, SearchInput, SearchContainer, MenuIcon, SearchIcon } from './header.style';
import SlideMenu from '../SlideMenu';
import menuIcon from '../../assets/Menu.svg';
import searchIcon from '../../assets/lupa-search.svg';

interface HeaderProps {
  backgroundColor?: string;
}

const Header: React.FC<HeaderProps> = ({ backgroundColor = 'var(--ion-color-primary)' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <HeaderContainer $bgColor={backgroundColor}>
        <SearchContainer>
          <SearchIcon src={searchIcon} alt="Search" />
          <SearchInput
            placeholder="O que você procura hoje?"
          />
        </SearchContainer>
        <MenuIcon
          src={menuIcon}
          alt="Menu"
          onClick={() => setIsMenuOpen(true)}
        />
      </HeaderContainer>
      <SlideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;