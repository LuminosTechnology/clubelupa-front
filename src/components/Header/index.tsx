import React, { useState } from 'react';
import {
  HeaderContainer,
  BarWrapper,
  SearchWrapper,
  SearchIcon,
  SearchInput,
  MenuIcon,
} from './header.style';
import SlideMenu from '../SlideMenu';

import newSearchIcon from '../../assets/new_search.svg';
import newMenuIcon   from '../../assets/new_menu.svg';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <HeaderContainer>
        <BarWrapper>
          {/* input com borda preta */}
          <SearchWrapper>
            <SearchIcon src={newSearchIcon} alt="Buscar" />
            <SearchInput placeholder="O que você procura hoje?" />
          </SearchWrapper>

          {/* ícone de menu */}
          <MenuIcon
            src={newMenuIcon}
            alt="Menu"
            onClick={() => setIsMenuOpen(true)}
          />
        </BarWrapper>
      </HeaderContainer>

      <SlideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
