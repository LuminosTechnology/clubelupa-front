import React, { useState } from "react";
import { 
    IonContent, 
    IonPage, 
    IonList, 
    IonItem, 
    IonLabel, 
    IonListHeader, 
    IonSpinner, 
    IonIcon,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonText
} from "@ionic/react";
import AppHeader from "../../components/SimpleHeader";

import { useNotificationsContext } from "../../contexts/NotificationsContext";
import { Notification } from "../../types/api/notifications";

import { NotificationService } from "../../services/notification-sevice";

import { ellipse, close } from 'ionicons/icons';

const Notifications: React.FC = () => {
    // 1. Buscando os dados e funções do nosso contexto global
    const { read, unread, refetchNotifications, isLoading } = useNotificationsContext(); // Supondo que o contexto forneça um estado de loading

    // 2. Estado para controlar qual notificação está aberta na modal
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

    // 3. Função para lidar com o clique em uma notificação não lida
    const handleUnreadNotificationClick = async (notification: Notification) => {
        // Mostra a modal imediatamente para o usuário
        setSelectedNotification(notification);

        try {
            // Chama a API para marcar como lida no backend
            await NotificationService.markAsRead(notification.id);
            // Atualiza o estado global de notificações
            await refetchNotifications();
        } catch (error) {
            console.error("Falha ao marcar notificação como lida:", error);
        }
    };

    // Função para renderizar o conteúdo principal
    const renderContent = () => {
        // Se estiver carregando, mostre um spinner
        if (isLoading) {
            return (
                <div className="ion-text-center ion-padding">
                    <IonSpinner name="crescent" />
                </div>
            );
        }

        // Se não houver notificações, mostre uma mensagem amigável
        if (unread.length === 0 && read.length === 0) {
            return (
                <div className="ion-text-center ion-padding">
                    <p>Você não tem nenhuma notificação.</p>
                </div>
            );
        }

        return (
            <>
                {/* --- Lista de Não Lidas --- */}
                {unread.length > 0 && (
                    <IonList>
                        <IonListHeader>
                            <IonLabel>Não Lidas</IonLabel>
                        </IonListHeader>
                        {unread.map(notification => (
                            <IonItem 
                                key={notification.id}
                                button // Faz o item parecer clicável (feedback visual)
                                detail={true} // Adiciona a setinha no final (iOS)
                                onClick={() => handleUnreadNotificationClick(notification)}
                            >
                                <IonIcon slot="start" icon={ellipse} color="primary" />
                                <IonLabel>
                                    <p>{notification.data.message}</p>
                                </IonLabel>
                            </IonItem>
                        ))}
                    </IonList>
                )}

                {/* --- Lista de Lidas --- */}
                {read.length > 0 && (
                     <IonList>
                        <IonListHeader>
                            <IonLabel>Lidas</IonLabel>
                        </IonListHeader>
                        {read.map(notification => (
                            <IonItem key={notification.id} lines="full">
                                {/* Itens lidos não são clicáveis e têm menos destaque */}
                                <IonLabel color="medium">
                                    <p>{notification.data.message}</p>
                                </IonLabel>
                            </IonItem>
                        ))}
                    </IonList>
                )}
            </>
        );
    };

    return (
        <IonPage>
            <AppHeader
                title="Notificações"
                backgroundColor="#868950"
                textColor="#FFFFFF"
            />

            <IonContent>
                {renderContent()}
            </IonContent>

            {/* --- Modal para Detalhes da Notificação --- */}
            <IonModal
                isOpen={!!selectedNotification}
                onDidDismiss={() => setSelectedNotification(null)}
            >
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Detalhes</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setSelectedNotification(null)}>
                                <IonIcon slot="icon-only" icon={close} />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    {selectedNotification && (
                        <IonText>
                            <p>{selectedNotification.data.message}</p>
                        </IonText>
                    )}
                </IonContent>
            </IonModal>
        </IonPage>
    );
};

export default Notifications;