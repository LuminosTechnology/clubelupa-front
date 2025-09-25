import React, { useState } from "react";
import {
  HeaderContainer,
  BarWrapper,
  SearchWrapper,
  SearchIcon,
  SearchInput,
  MenuIcon,
} from "./header.style";
import SlideMenu from "../SlideMenu";

import newSearchIcon from "../../assets/new_search.svg";
import newMenuIcon from "../../assets/new_menu.svg";
import { search } from "ionicons/icons";

import { MenuIconWrapper } from "./components/notificationIcon.style";
import { NotificationBadge } from "./components/notificationIcon";

type Props = {
  onSearchChange: (value: string) => void;
};

const Header: React.FC<Props> = ({ onSearchChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter'){
      onSearchChange(searchValue);
    }
  };

  return (
    <>
      <HeaderContainer>
        <BarWrapper>
          {/* input com borda preta */}
          <SearchWrapper>
            <SearchIcon src={newSearchIcon} alt="Buscar" />
            <SearchInput
              placeholder="O que você procura hoje?"
              onChange={(e) => {
                setSearchValue(e.target.value);
                //onSearchChange(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              value={searchValue}
            />
          </SearchWrapper>

          <MenuIconWrapper>
            <NotificationBadge />
            <MenuIcon
              src={newMenuIcon}
              alt="Menu"
              onClick={() => setIsMenuOpen(true)}
            />
          </MenuIconWrapper>
        </BarWrapper>
      </HeaderContainer>

      <SlideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
