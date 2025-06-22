
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.3697b83d93d14f5081a4abb8d138a52f',
  appName: 'vibrant-habit-bloom',
  webDir: 'dist',
  server: {
    url: 'https://3697b83d-93d1-4f50-81a4-abb8d138a52f.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false,
      spinnerColor: '#999999'
    }
  }
};

export default config;
