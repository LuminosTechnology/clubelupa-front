import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "br.com.clubelupa.app",
  appName: "Clube Lupa",
  webDir: "dist",
  plugins: {
    CapacitorGoogleMaps: {
      apiKey: "AIzaSyDoIWw3SXNki0nyFrJGoTjzHO5CkTqU1ms",
    },
    SplashScreen: {
      launchShowDuration: 0, // Define para 0 ou um valor muito pequeno (ex: 100 para 0.1 segundo)
      launchAutoHide: true,
      backgroundColor: "#9fa369ff", // Cor de fundo da splash nativa, ajuste para a cor predominante da sua splash web
      androidSplashResourceName: "splash", // Nome do drawable da splash nativa
      androidScaleType: "CENTER_CROP",
      showSpinner: false, // Opcional: para não mostrar o spinner de carregamento
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      backgroundColor: "transparent",
      translucent: true,
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
