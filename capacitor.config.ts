import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'LupaApp',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      backgroundColor: '#FFFFFF',
      style: 'dark',
      overlaysWebView: true
    },
    Geolocation: {
      permissions: {
        ios: {
          whenInUse: true,
          always: false
        },
        android: {
          fine: true,
          coarse: true
        }
      }
    }
  }
};

export default config;