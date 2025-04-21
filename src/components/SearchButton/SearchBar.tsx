import React from 'react';
import {
  SearchBarWrapper,
  SearchIcon,
  SearchInput,
} from './SearchBar.style';
import defaultIcon from '../../assets/lupa-search.svg';

interface SearchBarProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  iconSrc?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'O que você procura hoje?',
  iconSrc,
}) => (
  <SearchBarWrapper>
    <SearchIcon src={iconSrc || defaultIcon} alt="Buscar" />
    <SearchInput
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </SearchBarWrapper>
);

export default SearchBar;
