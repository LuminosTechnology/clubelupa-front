import React, { createContext, useContext, useEffect, useState } from "react";
import { Notifications } from "../types/api/notifications";
import { NotificationService } from "../services/notification-sevice";

interface NotificationsContext extends Notifications { 
  refetchNotifications: () => Promise<void>; 
}

export const NotificationsContext = createContext<NotificationsContext>(
  {} as NotificationsContext
);

type Props = {
  children: React.ReactNode;
};

export const NotificationsProvider: React.FC<Props> = ({ children }) => {
    
    const [notifications, setNotifications] = useState<Notifications>({
        read: [],
        unread: [],
    });

      const fetchNotifications = async () => {
        const response = await NotificationService.getNotifications();
        setNotifications(response);
      };

        useEffect(() => {
            fetchNotifications();
        }, []);      

    const providerValue = {
      ...notifications,
      refetchNotifications: fetchNotifications,
    };        

    return (
        <NotificationsContext.Provider value={ providerValue }>
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotificationsContext = () => useContext(NotificationsContext);