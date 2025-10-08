// src/components/CustomModal/CustomModal.tsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Importaremos os estilos que vamos criar a seguir
import { ModalWrapper, ModalBackdrop, ModalContent } from './CustomModal.style';

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, children }) => {
    return (
        // AnimatePresence permite que o componente anime ao ser REMOVIDO da árvore do React
        <AnimatePresence>
            {isOpen && (
                <ModalWrapper>
                    {/* O fundo escuro com animação de fade */}
                    <ModalBackdrop
                        //onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                    
                    {/* O contêiner do conteúdo com animação de "pop-up" */}
                    <ModalContent
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        // Impede que o clique no conteúdo feche a modal
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                    </ModalContent>
                </ModalWrapper>
            )}
        </AnimatePresence>
    );
};