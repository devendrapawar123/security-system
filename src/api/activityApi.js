import axios from "./axios";

const activityApi = {
  getActivities(params = {}) {
    return axios.get("/activity/", { params });
  },

  getActivityById(id) {
    return axios.get(`/activity/${id}/`);
  },
};

export default activityApi;