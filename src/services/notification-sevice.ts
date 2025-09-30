import api from "../config/api";
import { Notifications } from "../types/api/notifications";

export const NotificationService = {

  getNotifications: async () => {
    const response = await api.get<Notifications>("/user/notifications");
    return response.data;
  },
  markAsRead: async (notificationId: string): Promise<void> => {
      await api.post(`user/notifications/${notificationId}/mark-as-read`);
  }, 
  deleteNotification: async (notificationId: string): Promise<void> => {
      await api.delete(`/user/notifications/${notificationId}`);
  }  

};
