import axios from "./axios";

const settingsApi = {

  // Get user settings
  getSettings() {
    return axios.get("/settings/");
  },

  // Update settings
  updateSettings(data) {
    return axios.put("/settings/", data);
  },

  // Change theme
  updateTheme(theme) {
    return axios.patch("/settings/theme/", {
      theme,
    });
  },

  // Change language
  updateLanguage(language) {
    return axios.patch("/settings/language/", {
      language,
    });
  },

  // Notification settings
  updateNotificationSettings(data) {
    return axios.patch(
      "/settings/notifications/",
      data
    );
  },

};

export default settingsApi;