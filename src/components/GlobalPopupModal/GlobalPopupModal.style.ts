import styled from 'styled-components';
import { IonModal, IonButton } from '@ionic/react';

// 1. Estilizando o IonModal
// Criamos um novo componente que é um IonModal com nossos estilos base.
export const StyledPopupModal = styled(IonModal)`
    --background: transparent;
    --box-shadow: none;
`;

// 2. Estilizando o contêiner principal
// Este será o nosso 'div' que centraliza o conteúdo.
export const PopupContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

// 3. Estilizando a imagem do popup
// Este componente renderizará a tag 'img'.
export const PopupImage = styled.img`
    width: 90%;
    max-width: 400px;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
`;

// 4. Estilizando o botão de fechar
// Este componente é um IonButton com estilos customizados.
// Note como usamos as variáveis CSS do Ionic (--color, etc.) para garantir a compatibilidade.
export const CloseButton = styled(IonButton)`
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 10;
    
    --color: white;
    --background: rgba(0, 0, 0, 0.5);
    --background-hover: rgba(0, 0, 0, 0.7);
    --padding-start: 0;
    --padding-end: 0;
    --border-radius: 50%;
    
    width: 32px;
    height: 32px;
`;