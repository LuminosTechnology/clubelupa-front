import React from 'react';
import { IonContent, IonIcon } from '@ionic/react';
import { usePopupContext } from '../../contexts/PopupContext';
import { close } from 'ionicons/icons';

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
        <CustomModal
            isOpen={!!currentPopup}
            onClose={dismissPopup}
        >
            
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