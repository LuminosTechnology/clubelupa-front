import styled from "styled-components";

export const NotificationIcon = styled.div`
  position: absolute;
  top: -1px;
  left: 2px;
  z-index: 9;
  
  /* Desloca o contador para ficar bem no canto, sobrepondo o ícone */
  transform: translate(-40%, -40%);

  width: 16px;
  height: 16px;
  border-radius: 50%; /* Deixa o elemento redondo */
  background-color: red;
  color: white;
  padding: 2px;
  
  /* Centraliza o número dentro do círculo */
  display: flex;
  align-items: center;
  justify-content: center;
  
  font-size: 10px;
  font-weight: bold;
  border: 1px solid white; /* Adiciona uma borda para destacar */
`;

export const MenuIconWrapper = styled.div`
  position: relative; /* Essencial para posicionar o contador dentro dele */
  display: inline-block; /* Faz com que o wrapper tenha o tamanho do seu conteúdo */
  cursor: pointer;
`;