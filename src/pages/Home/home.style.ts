import { IonAlert } from "@ionic/react";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 50px;

  h2 {
    color: white;
  }
`;

export const ColapseButtonsContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  z-index: 20;
  `;

  export const ColapseButtonDiv = styled.div`
  display: flex;
  width: 35%;
  flex-direction: row;
  justify-content: center;  
  align-items: center;
  `;

export const CollapsedButton = styled.button`
  background: none;
  flex-direction: column;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  position: relative;
  span {
    text-align: center;
    color: #8e9455;
    font-size: 0.875rem;
  }
`;

export const IconWithCountContainer = styled.div`
  position: absolute;
  width: 32px;
  height: 32px;
  bottom: 6px;    
  z-index: 9;

  /* Classes para posicionar à esquerda ou à direita do avatar */
  &.icon-left {
    left: -6px;
  }

  &.icon-right {
    right: -6px;
  }
`;

export const IconCount = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* O truque para centralização perfeita */

  &.moeda {
    left: 46%;
    top: 47%;
  }
  
  color: #fff; /* Uma cor escura que combina com a paleta */
  font-size: 12px;
  font-weight: 400; /* Negrito para melhor legibilidade */
  z-index: 10; /* Garante que o número fique sobre a imagem */
`;

export const AvatarContainer = styled.div`
  position: relative;
  z-index: 10;
  transition: all 0.3s ease; 
  img {
    border-radius: 50%;
  }

  margin-top: -52px;
  width: 30%;

  .avatar-icon{
    width: 100%;
    height: 100%;    
  }


  .avatar-left{
    left: -6px;
  }

  .avatar-right{
    right: -6px;
  }  

`;


export const AvatarProgressBorder = styled.div<{ $progress: number }>`
  border-radius: 100%;
  aspect-ratio: 1;
  width: 100%;
  position: relative;

  padding: 5px;
  background: ${({ $progress }) =>
    `conic-gradient(#D7A07D ${$progress}%, #bfc1c2 ${$progress}% 100%)`};

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;


export const ContainerSuccess = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  padding: 0 50px;
`;

export const Title = styled.h1`
  color: #ffffff;
  font-size: 25px;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 0;
`;

export const Subtitle = styled.p`
  color: #ffffff;
  font-size: 18px;
  text-align: center;
  margin-top: 0;
  margin-bottom: 0;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 32px;
  display: flex;
  justify-content: center;
`;

export const ErrorMessage = styled.div`
  color: #ff4646;
  font-size: 12px;
  margin-top: 8px;
  width: 100%;
  text-align: left;
`;

export const UserDataContainer = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  margin: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h2 {
    color: #333;
    margin-bottom: 15px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 8px 0;
      border-bottom: 1px solid #eee;
      color: #666;

      &:last-child {
        border-bottom: none;
      }
    }
  }
`;
export const StyledAlert = styled(IonAlert)`
  .alert-message {
    white-space: pre-line; /* Faz o \n virar quebra de linha */
  }
`;