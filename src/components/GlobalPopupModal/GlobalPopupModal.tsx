import React from 'react';
import { IonContent, IonIcon } from '@ionic/react';
import { usePopupContext } from '../../contexts/PopupContext';
import { close } from 'ionicons/icons';

// 1. REMOVA O IMPORT DO ARQUIVO CSS ANTIGO
// import './GlobalPopupModal.css'; 

// 2. IMPORTE OS NOVOS STYLED COMPONENTS
import {
    StyledPopupModal,
    PopupContainer,
    PopupImage,
    CloseButton
} from './GlobalPopupModal.style';

import { CustomModal } from '../CustomModal/CustomModal';

export const GlobalPopupModal: React.FC = () => {
    const { currentPopup, dismissPopup, handlePopupAction } = usePopupContext();

    return (
        // 3. SUBSTITUA IonModal por StyledPopupModal
        <CustomModal
            isOpen={!!currentPopup}
            onClose={dismissPopup}
        >
            {/* O conteúdo que você quer exibir DENTRO da modal vai aqui */}
            <PopupContainer>
                <CloseButton
                    fill="clear"
                    onClick={dismissPopup}
                >
                    <IonIcon slot="icon-only" icon={close} />
                </CloseButton>
                
                {currentPopup && (
                    <PopupImage
                        src={currentPopup.image_url}
                        alt="Popup de Destaque"
                        onClick={handlePopupAction}
                    />
                )}
            </PopupContainer>
        </CustomModal>
    );
};