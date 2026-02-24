import { loaderInterceptor } from './core/interceptors/loader.interceptor';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  ErrorHandler,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { JabilPreset } from './app-preset';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { notificationInterceptor } from './core/interceptors/notification.interceptor';
import { appInitializer } from './core/initializers/appInitializer';
import { SplashService } from './core/services/splash.service';
import { GlobalErrorHandler } from './core/services/global-error-handler';
import { errorInterceptor } from './core/interceptors/error.Interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions()),
    providePrimeNG({
      theme: {
        preset: JabilPreset,
        options: {
          darkModeSelector: 'none', // O 'none' si no quieres modo oscuro
        },
      },
    }),
    MessageService,
    ConfirmationService,
    provideHttpClient(
      withInterceptors([loaderInterceptor, notificationInterceptor, errorInterceptor]),
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [SplashService],
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
};
