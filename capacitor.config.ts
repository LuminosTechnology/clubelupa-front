import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.clubelupa.app",
  appName: "LupaApp",
  webDir: "dist",
  plugins: {
    GoogleMaps: {
      apiKey: "AIzaSyCWNg1ASza0HDHNKDzGpSl6MMmKb3zVqWs",
    },
    SplashScreen: {
      androidScaleType: "CENTER_CROP",
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      backgroundColor: "#FFFFFF",
      style: "dark",
      overlaysWebView: true,
    },
    Geolocation: {
      permissions: {
        ios: {
          whenInUse: true,
          always: false,
        },
        android: {
          fine: true,
          coarse: true,
        },
      },
    },
  },
};

export default config;
