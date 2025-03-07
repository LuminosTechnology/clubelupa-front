import styled from 'styled-components';
export const HeaderContainer = styled.div<{ $bgColor: string }>`
  height: 138.9px;
  width: 100%;
  background-color: #F0F0EF;
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  box-shadow: 0px -3px 10px 0px #00000080;


  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 35px;
    background-color: #F0F0EF;
    border-bottom-left-radius: 35px;
    border-bottom-right-radius: 35px;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #F0F0EF;
  border-radius: 8px;
  padding: 0 15px;
  flex: 1;
  margin-right: 30px;
  height: 43px;
  position: relative;
  border-radius: 100px;
  border: 1px solid #868950;
`;

export const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: #CBCCCE;
  flex: 1;
  font-family: 'Karla', sans-serif;
  font-size: 12px;
  outline: none;
  padding: 0 15px;

  &::placeholder {
    color: #CBCCCE;
  }
`;

export const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const MenuIcon = styled.img`
  width: 44px;
  height: auto;
  margin-left: 16px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  color: #868950;

  &:hover {
    opacity: 0.8;
  }
`;