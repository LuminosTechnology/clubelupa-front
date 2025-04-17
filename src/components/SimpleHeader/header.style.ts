import styled from 'styled-components';

export const HeaderContainer = styled.div<{ $bgColor: string }>`
  width: 100%;
  height: 138.9px;
  background-color: ${({ $bgColor }) => $bgColor};
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  box-shadow: 0px -3px 10px 0px #00000080;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 35px;
    background-color: ${({ $bgColor }) => $bgColor};
    border-bottom-left-radius: 35px;
    border-bottom-right-radius: 35px;
  }
`;

export const Title = styled.h1<{ $color: string }>`
  flex: 1;
  margin-top: 25px;
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  color: ${({ $color }) => $color};
  
`;

/* ícone do menu — sempre branco */
export const MenuIcon = styled.img`
  width: 44px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  filter: brightness(0) invert(1);        /* força branco mesmo se o SVG tiver cor */

  &:hover {
    opacity: 0.8;
  }
`;

/* espaçador de 44 px para manter o título central quando não há menu */
export const RightSpacer = styled.div`
  width: 44px;
`;
