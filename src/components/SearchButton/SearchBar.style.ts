import styled from "styled-components";

export const SearchBarWrapper = styled.div`
  border-radius: 100px;
  background: #f0f0ef;
  border: 1px solid #868950;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.5rem 1rem;
  margin: 2rem 1.25rem;
  margin-right: 2rem;
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
  font-size: 14px;
  color: black;
  outline: none;

  &::placeholder {
    color: #cbccce;
  }
`;

export const FilterButton = styled.button`
  background-color: transparent;
  color: var(--ion-color-primary);
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 0;
`;
