import api from "./axios";
import { SESSION_ENDPOINTS } from "@/utils/constants";

const sessionApi = {
  getSessions() {
    return api.get(SESSION_ENDPOINTS.LIST);
  },

  logoutSession(sessionId) {
    return api.patch(
      `${SESSION_ENDPOINTS.TERMINATE}${sessionId}/status/`,
      {
        status: "terminated",
      }
    );
  },
};

export default sessionApi;