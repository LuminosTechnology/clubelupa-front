import { NotificationIcon } from "./notificationIcon.style";
import { useNotificationsContext } from "../../../contexts/NotificationsContext";

interface NotificationBadgeProps {
  variant?: 'header' | 'menu';
}

export const NotificationBadge = ({ variant = 'header' }: NotificationBadgeProps ) => {

    const { unread } = useNotificationsContext();

    const isDisplayNone = !unread.length ? 'displayNone' : '';

    return (
        <NotificationIcon variant={variant} className={isDisplayNone} >
            { unread.length ?? 0 }
        </NotificationIcon>
    );
};