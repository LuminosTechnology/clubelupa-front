import React, { useEffect, useRef, useState } from 'react';
import {
    IonModal,
    IonContent,
    IonIcon
} from '@ionic/react';
import Confetti from 'react-confetti';
import {  shareSocialOutline } from "ionicons/icons";

import { CloseBtn, ShareButton } from "./style";


import { useGamificationContext } from '../../contexts/GamificationContext';
import { RewardItem } from '../../types/api/rewards';

import { Share } from '@capacitor/share';

import './GlobalRewardModal.css';

import pointsIcon from '../../assets/moeda.svg';
import coinsIcon from '../../assets/moeda.svg';
import levelUpIcon from '../../assets/moeda.svg';

import footerClose from "../../assets/footer-close.svg";

interface RewardDetailsProps {
    reward: RewardItem;
    onAction: () => void;
}

/**
 * Componente interno para renderizar o conteúdo dinâmico da recompensa
 */
const RewardDetails: React.FC<RewardDetailsProps> = ({ reward, onAction }) => {

    let content;
    const showShareButton = reward.type === 'points' 
                            || reward.type === 'coins' 
                            || reward.type === 'medal' 
                            || reward.type === 'level_up'
                            || reward.type === 'experience';

    const isCoin = reward.type === 'coins';
    const isExperience = reward.type === 'experience';

    switch (reward.type) {
        case 'points':
            content = (
                <>
                    <img src={pointsIcon} alt="Pontos" className="reward-icon" />
                    <h2 className="reward-title addington">+{reward.data.amount} Pontos!</h2>
                    <p className="reward-subtitle addington italic">Você está mais perto do próximo nível.</p>                                    
                </>
            );
        break;
        case 'coins':
            content = (
                <>
                    <img src={coinsIcon} alt="Moedas" className="reward-icon" />                    
                    <h2 className="reward-title addington">Parabéns</h2>                  
                    <p className="reward-subtitle addington italic"> Aqui, comprar rende pontos.</p>
                    <p className="reward-subtitle karla"> Você acaba de acumular +{reward.data.amount} moedas Lupa em sua conta.</p>                  
                </>
            );
        break;
        case 'level_up':
            content = (
                <>                    
                    <img src={levelUpIcon} alt="Nível" className="reward-icon" />
                    <h2 className="reward-title addington">Parabéns<br/>Você subiu de Nível!</h2>
                    <p className="reward-subtitle addington italic">Você atingiu o {reward.data.new_level_name}</p>
                </>
            );
        break;
        case 'medal':
            content = (
                <>
                    <img src={reward.data.icon_url} alt={reward.data.name} className="reward-icon" />
                    <h2 className="reward-title addington">Você conquistou uma medalha inédita!</h2>
                    <p className="reward-subtitle upper karla">{reward.data.name}</p>
                </>
            );
        break;
        case 'experience':
            content = (
                <>
                    <img src={coinsIcon} alt="Moedas" className="reward-icon" />  
                    <h2 className="reward-title addington">Parabéns!</h2>
                    <p className="reward-subtitle addington italic">Você desbloqueou mais uma experiência incrível!</p>
                    <p className="reward-subtitle karla">{reward.data.title}</p>
                    <p className="reward-subtitle karla">{reward.data.establishment}</p>                    
                </>
            );
        break;
        default:
            return null;
    }

    return (
        <>
            {content}
            {showShareButton && (
                <ShareButton onClick={onAction}>
                    {!isCoin && !isExperience && <IonIcon
                                    icon={shareSocialOutline}
                                    style={{ fontSize: 20, marginRight: 12 }}
                                />
                    }

                    { reward.type === 'coins' ? 'Trocar Moedas' : 
                      reward.type === 'experience' ? 'Ir para Histórico' : 'COMPARTILHAR' }
                </ShareButton>
            )}
            <div style={{height: '20%'}}></div>
        </>
    );

};

export const GlobalRewardModal: React.FC = () => {
    const { currentReward, dismissCurrentReward, setPostRewardRedirect  } = useGamificationContext();
    const [showConfetti, setShowConfetti] = useState(false);

    const modalRef = useRef<HTMLIonModalElement>(null);

    const handleClose = () => {
        // Pede ao IonModal para executar sua animação de fechamento
        modalRef.current?.dismiss();
    };    

    const handleShare = async () => {
        if (!currentReward) return;

        // 3. CRIE A MENSAGEM DINÂMICA
        let shareText = "Olha só o que eu conquistei no App Lupa!";
        switch (currentReward.type) {
            case 'points':
                shareText = `Acabei de ganhar ${currentReward.data.amount} pontos no App Lupa! Rumo ao próximo nível! 💪`;
                break;
            case 'coins':
                shareText = `Ganhei ${currentReward.data.amount} moedas no App Lupa! Hora de trocar por prêmios. 💰`;
                break;
            case 'level_up':
                shareText = `Subi de nível no App Lupa! 🎉 Agora sou ${currentReward.data.new_level_name}.`;
                break;
            case 'medal':
                shareText = `Desbloqueei a medalha "${currentReward.data.name}" no App Lupa! 🏆`;
                break;
            case 'experience':
                shareText = `Desbloqueei uma experiência incrível no App Lupa! 🎉 ${currentReward.data.title} - ${currentReward.data.establishment} 🎉`;
                break;
        }
        
        try {
            // 4. CHAME A FUNÇÃO NATIVA DO CAPACITOR
            await Share.share({
                title: 'Minha Conquista no App Lupa!',
                text: shareText,
                url: 'https://seusite.com/baixe-o-app', // URL para download do seu app
                dialogTitle: 'Compartilhar com amigos',
            });
            // Opcional: você pode fechar a modal após o compartilhamento bem-sucedido
            handleClose();
        } catch (error) {
            // Ocorre se o usuário cancelar o compartilhamento, não é um erro real.
            console.log('Compartilhamento cancelado pelo usuário', error);
        }
    };    

    const handleActionClick = () => {
        if (!currentReward) return;

        if (currentReward.type === 'coins'){
            setPostRewardRedirect('/lupacoins');
            handleClose();
        }
        else if (currentReward.type === 'experience'){
            setPostRewardRedirect('/experience');
            handleClose();
        }
        else{ 
            handleShare();
        }
        
    };    

    useEffect(() => {
        if (currentReward) {
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [currentReward]);

    return (
        <>               
            <IonModal
                 ref={modalRef}
                isOpen={!!currentReward}
                onDidDismiss={dismissCurrentReward}
                initialBreakpoint={0.8}
                breakpoints={[0, 0.5, 0.8]}
                handle={true}
            >       
                {showConfetti && <Confetti recycle={true} numberOfPieces={600} className='confettiEffect' />}                
                <IonContent className="ion-padding">
                    <div className="reward-content-container">

                        {currentReward && <RewardDetails reward={currentReward} onAction={handleActionClick} />}

                        {/* <IonButtons slot="end" className='buttonClose'>
                            <IonButton onClick={handleClose}>
                                <IonIcon slot="icon-only" icon={close} />
                            </IonButton>
                        </IonButtons>   */}

                        <CloseBtn onClick={handleClose}>
                            <img src={footerClose} alt="Fechar conquistas" />
                        </CloseBtn>                        

                    </div>                  
                </IonContent>
            </IonModal>
        </>
    );
};

export default GlobalRewardModal;