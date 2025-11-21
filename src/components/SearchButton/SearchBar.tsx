import React, { useState } from "react";
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
  onChange,
  placeholder = "O que você procura hoje?",
  iconSrc,
  onFilterClick,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onChange(inputValue);
    }
  };

  return (
    <SearchBarWrapper>
      <SearchIcon src={iconSrc || defaultIcon} alt="Buscar" />
      <SearchInput
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {onFilterClick && (
        <FilterButton onClick={onFilterClick}>
          Filtros
          <IonIcon icon={"caret-down"} />
        </FilterButton>
      )}
    </SearchBarWrapper>
  );
};

export default SearchBar;
