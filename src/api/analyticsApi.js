import axios from "./axios";

const analyticsApi = {
  getAnalytics() {
    return axios.get("/api/analytics/");
  },
};

export default analyticsApi;