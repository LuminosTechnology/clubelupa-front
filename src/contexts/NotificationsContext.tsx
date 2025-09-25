import React, { createContext, useContext, useEffect, useState } from "react";
import { Notifications } from "../types/api/notifications";
import { NotificationService } from "../services/notification-sevice";

interface NotificationsContext extends Notifications { 
  refetchNotifications: () => Promise<void>; 
  isLoading: boolean;
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

     const [isLoading, setIsLoading] = useState(true);

      const fetchNotifications = async () => {

        setIsLoading(true);

        try {
          const response = await NotificationService.getNotifications();

          if(response)
            setNotifications(response);
          else
            setNotifications({ read: [], unread: [] });  

        } catch (error) {
           setNotifications({ read: [], unread: [] });
        } finally {
            setIsLoading(false);
        }
        
      };

        useEffect(() => {
            fetchNotifications();
        }, []);      

    const providerValue = {
      ...notifications,
      refetchNotifications: fetchNotifications,
      isLoading
    };        

    return (
        <NotificationsContext.Provider value={ providerValue }>
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotificationsContext = () => useContext(NotificationsContext);