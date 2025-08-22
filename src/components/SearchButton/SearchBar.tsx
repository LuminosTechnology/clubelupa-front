import React from "react";
import {
  FilterButton,
  SearchBarWrapper,
  SearchIcon,
  SearchInput,
} from "./SearchBar.style";
import defaultIcon from "../../assets/lupa-search.svg";
import { IonIcon } from "@ionic/react";

interface SearchBarProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  iconSrc?: string;
  onFilterClick?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "O que você procura hoje?",
  iconSrc,
  onFilterClick,
}) => (
  <SearchBarWrapper>
    <SearchIcon src={iconSrc || defaultIcon} alt="Buscar" />
    <SearchInput
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {onFilterClick && (
      <FilterButton onClick={onFilterClick}>
        Filtros
        <IonIcon icon={"caret-down"} />
      </FilterButton>
    )}
  </SearchBarWrapper>
);

export default SearchBar;
