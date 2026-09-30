import api from "./axios";
import { NOTIFICATION_ENDPOINTS } from "@/utils/constants";

const notificationApi = {
  getNotifications() {
    return api.get(NOTIFICATION_ENDPOINTS.LIST);
  },

  markAsRead(id) {
    return api.patch(
      `${NOTIFICATION_ENDPOINTS.LIST}${id}/read/`
    );
  },

  markAllRead() {
    return api.patch(
      NOTIFICATION_ENDPOINTS.MARK_ALL_READ
    );
  },
};

export default notificationApi;