import styled from 'styled-components';

export const HeaderContainer = styled.div<{ $bgColor: string; $isIOSLike?: boolean }>`
  width: 100%;
  height: 10%;
  background-color: ${({ $bgColor }) => $bgColor};
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  box-shadow: 0px -3px 10px 0px #00000080;

  ${(props) =>
    props.$isIOSLike && `
    padding-top: 60px;
  `
  }
`;

export const Title = styled.h1<{ $color: string }>`
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  color: ${({ $color }) => $color};
  margin: 0 !important;
  
`;

/* ícone do menu — sempre branco */
export const MenuIcon = styled.img`
  width: 25px;
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
