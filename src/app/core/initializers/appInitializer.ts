import { SplashService } from '../services/splash.service';

export function appInitializer(splash: SplashService) {
  return () =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        splash.hide();
        resolve();
      }, 1500);
    });
}
