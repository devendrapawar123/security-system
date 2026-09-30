import api from "./axios";

const dashboardApi = {
  getSummary() {
    return api.get("/dashboard/summary/");
  },

  getAnalytics() {
    return api.get("/dashboard/analytics/");
  },

  getSecurityStatus() {
    return api.get("/dashboard/security-status/");
  },
};

export default dashboardApi;