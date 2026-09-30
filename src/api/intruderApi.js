import axios from "./axios";

const intruderApi = {
  getIntruders(params = {}) {
    return axios.get("/intruders/", { params });
  },

  getIntruder(id) {
    return axios.get(`/intruders/${id}/`);
  },
};

export default intruderApi;