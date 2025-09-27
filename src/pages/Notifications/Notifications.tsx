import React, {useState} from 'react';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonListHeader,
    IonModal,
    IonPage,
    IonSpinner,
    IonText,
    IonTitle,
    IonToolbar,
    useIonAlert
} from "@ionic/react";

import AppHeader from "../../components/SimpleHeader";
import { useNotificationsContext } from "../../contexts/NotificationsContext";

import { Notification } from "../../types/api/notifications";
import { NotificationService } from "../../services/notification-sevice";

import { close, ellipse, trash } from 'ionicons/icons';

const Notifications: React.FC = () => {

    const { read, unread, refetchNotifications, isLoading } = useNotificationsContext();

    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

    const [deletingId, setDeletingId] = useState<string | null>(null);

    const [presentAlert] = useIonAlert();

    const handleUnreadNotificationClick = async (notification: Notification) => {
        setSelectedNotification(notification);

        try {
            await NotificationService.markAsRead(notification.id);
            await refetchNotifications();
        } catch (error) {
            console.error("Falha ao marcar notificação como lida:", error);
        }
    };

    const handleDeleteNotification = (notificationId: string, slidingItem: HTMLIonItemSlidingElement | null) => {
        presentAlert({
            header: 'Confirmar Exclusão',
            message: 'Você tem certeza de que deseja excluir esta notificação?',
            buttons: [
                { text: 'Cancelar', role: 'cancel', handler: () => slidingItem?.close() },
                {
                    text: 'Excluir',
                    role: 'confirm',
                    handler: async () => {
                        setDeletingId(notificationId);
                        try {
                            await NotificationService.deleteNotification(notificationId);
                            await refetchNotifications();
                        } catch (error) {
                            console.error("Falha ao excluir notificação:", error);                            
                        } finally {                            
                            setDeletingId(null);
                        }
                    },
                },
            ],
        });
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="ion-text-center ion-padding">
                    <IonSpinner name="crescent" />
                </div>
            );
        }

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
                        {unread.map(notification => {
                            const slidingItemRef = React.createRef<HTMLIonItemSlidingElement>();
                            return (
                                <IonItemSliding key={notification.id} ref={slidingItemRef}>
                                    <IonItemOptions side="end">
                                        <IonItemOption color="danger" onClick={() => handleDeleteNotification(notification.id, slidingItemRef.current)}>
                                            <IonIcon slot="icon-only" icon={trash} />
                                        </IonItemOption>
                                    </IonItemOptions>

                                    <IonItem button detail={true} onClick={() => handleUnreadNotificationClick(notification)}>
                                        <IonIcon slot="start" icon={ellipse} color="primary" />
                                        <IonLabel>
                                            <p>{notification.data.message}</p>
                                        </IonLabel>
                                        {deletingId === notification.id && <IonSpinner slot="end" name="dots" />}
                                    </IonItem>
                                </IonItemSliding>
                            );
                        })}
                    </IonList>
                )}

                {/* --- Lista de Lidas --- */}
                {read.length > 0 && (
                     <IonList>
                        <IonListHeader>
                            <IonLabel>Lidas</IonLabel>
                        </IonListHeader>
                        {read.map(notification => {
                            const slidingItemRef = React.createRef<HTMLIonItemSlidingElement>();
                             return (
                                <IonItemSliding key={notification.id} ref={slidingItemRef}>
                                    <IonItemOptions side="end">
                                        <IonItemOption color="danger" onClick={() => handleDeleteNotification(notification.id, slidingItemRef.current)}>
                                            <IonIcon slot="icon-only" icon={trash} />
                                        </IonItemOption>
                                    </IonItemOptions>

                                    <IonItem lines="full">
                                        <IonLabel color="medium">
                                            <p>{notification.data.message}</p>
                                        </IonLabel>
                                        {deletingId === notification.id && <IonSpinner slot="end" name="dots" />}
                                    </IonItem>
                                </IonItemSliding>
                            );
                        })}
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