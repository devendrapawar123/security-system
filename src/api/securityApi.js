import axios from "./axios";

const securityApi = {
  getStatus() {
    return axios.get("/api/security/status/");
  },
};

export default securityApi;