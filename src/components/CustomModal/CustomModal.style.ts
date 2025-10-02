import styled from 'styled-components';
import { motion } from 'framer-motion';

// O contêiner principal que ocupa a tela toda e centraliza o conteúdo
export const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000; /* Garante que fique sobre todo o conteúdo */
    
    display: flex;
    align-items: center;
    justify-content: center;
`;

// O fundo escuro semi-transparente. Usamos 'motion.div' para habilitar a animação.
export const ModalBackdrop = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
`;

// A "janela" da modal que contém o conteúdo.
export const ModalContent = styled(motion.div)`
    position: relative; /* Garante que fique na frente do backdrop */
    background-color: transparent; /* O fundo será a própria imagem */
    padding: 0;
    border-radius: 16px;
    
    /* Define os limites de tamanho */
    width: 90vw;
    max-width: 450px;
    
    /* Remove a altura para que ela se ajuste à imagem */
    height: auto;
`;