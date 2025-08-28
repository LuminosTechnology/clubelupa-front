import styled from "styled-components";

/**
 * Container absoluto (sem cor), apenas posiciona o BarWrapper
 */
export const HeaderContainer = styled.div`
  position: absolute;
  top: 55px; /* 55px do topo */
  left: 0;
  right: 0;
  display: flex;
  justify-content: center; /* centraliza o filho */
  z-index: 10;
`;

/**
 * Fundo branco arredondado envolvendo SEARCH + MENU
 */
export const BarWrapper = styled.div`
  width: 364px;
  height: 50px;
  background: #ffffff;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* <— adiciona isso */
  padding: 0 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

/**
 * Caixinha interna do input, com largura e altura definidas
 * e borda preta 24% opacity
 */
export const SearchWrapper = styled.div`
  width: 257px; /* largura do input envolta */
  height: 36px; /* altura do input envolta */
  display: flex;
  align-items: center;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.24);
  border-radius: 100px;
  padding: 0 12px;
`;

/**
 * Ícone de lupa dentro do SearchWrapper
 */
export const SearchIcon = styled.img`
  width: 28px; /* largura do ícone */
  height: 28px; /* altura do ícone */
`;

/**
 * Input transparente, ocupando o restante do SearchWrapper
 */
export const SearchInput = styled.input`
  flex: 1;
  height: 25px; /* altura do campo de texto */
  margin-left: 8px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  color: #666666;

  &::placeholder {
    color: #cbccce;
  }
`;

/**
 * Ícone de menu à direita, ainda dentro do BarWrapper
 */
export const MenuIcon = styled.img`
  width: 46px;
  height: 24px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
