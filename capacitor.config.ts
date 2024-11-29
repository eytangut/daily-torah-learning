import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.eytangut.dailytorahlearning',
  appName: 'Daily Torah Learning',
  webDir: 'dist',
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF"
    },
    CapacitorUpdater: {
      updateUrl: 'https://eytangut.github.io/daily-torah-learning/updates.json'
    }
  }
};

export default config;
