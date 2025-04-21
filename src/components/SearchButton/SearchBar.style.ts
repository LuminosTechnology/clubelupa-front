import styled from 'styled-components';

export const SearchBarWrapper = styled.div`
  margin-left: 20px;
  height: 43px;
  border-radius: 100px;
  background: #f0f0ef;
  border: 1px solid #868950;
  display: flex;
  align-items: center;
  padding: 0 15px;
  gap: 12px;
`;

export const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-family: "Karla", sans-serif;
  font-size: 12px;
  color: #cbccce;
  outline: none;

  &::placeholder {
    color: #cbccce;
  }
`;
