import { NotificationIcon } from "./notificationIcon.style";
import { useNotificationsContext } from "../../../contexts/NotificationsContext";

interface NotificationBadgeProps {
  variant?: 'header' | 'menu';
}

export const NotificationBadge = ({ variant = 'header' }: NotificationBadgeProps ) => {

    const { unread } = useNotificationsContext();

    return (
        <NotificationIcon variant={variant} >
            { unread.length ?? 0 }
        </NotificationIcon>
    );
};