import api from "./axios";
import { REPORT_ENDPOINTS } from "@/utils/constants";

const reportApi = {
  getReports(days = 7) {
    return api.get(REPORT_ENDPOINTS.LIST, {
      params: { days },
    });
  },

  generateReport(data) {
    return api.post(REPORT_ENDPOINTS.GENERATE, data);
  },

  downloadReport(reportType) {
    return api.get(
      `${REPORT_ENDPOINTS.DOWNLOAD}${reportType}/`,
      {
        responseType: "blob",
      }
    );
  },
};

export default reportApi;