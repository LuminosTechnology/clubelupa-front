import styled, { css } from "styled-components";

type NotificationIconProps = {
  variant: 'header' | 'menu';
};

export const NotificationIcon = styled.div<NotificationIconProps>`

  ${({ variant }) => {

    switch(variant) {
      case 'header':
        return css`        
          top: -1px;
          left: 2px;        
        `;
      case 'menu':
        return css`              
          top: 0px;
          right: -20px;         
        `;
    }

  }}


  position: absolute;
  z-index: 9;
  
  transform: translate(-40%, -40%);

  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--ion-color-tertiary);
  color: white;
  padding: 2px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  font-size: 10px;
  font-weight: bold;
  border: 1px solid white;

  &.displayNone {
    display: none;
  }
`;

export const MenuIconWrapper = styled.div`
  position: relative; /* Essencial para posicionar o contador dentro dele */
  display: inline-block; /* Faz com que o wrapper tenha o tamanho do seu conteúdo */
  cursor: pointer;
`;