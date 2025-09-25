import { NotificationIcon } from "./notificationIcon.style";
import { useNotificationsContext } from "../../../contexts/NotificationsContext";

export const NotificationBadge = () => {

    const { unread } = useNotificationsContext();

    

    return (
        <NotificationIcon>
            { unread.length ?? 0 }
        </NotificationIcon>
    );
};