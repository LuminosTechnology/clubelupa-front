export type DataAttributte = {
    message: string;
}

export interface Notification {
    id: string;
    notifiable_id: number;
    data: DataAttributte;
    read_at: string;
}
export interface NotificationRead extends Notification {}

export interface NotificationUnread extends Notification {}

export interface Notifications{
    read: NotificationRead[];
    unread: NotificationUnread[];    
}
