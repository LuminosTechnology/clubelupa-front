import api from "../config/api";
import { Notifications } from "../types/api/notifications";

export const NotificationService = {
  getNotifications: async () => {
    const response = await api.get<Notifications>("/user/notifications");
    return response.data;
  },
};
