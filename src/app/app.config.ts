import { loaderInterceptor } from './core/services/interceptors/loader.interceptor';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { JabilPreset } from './app-preset';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { notificationInterceptor } from './core/services/interceptors/notification.interceptor';

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
    provideHttpClient(withInterceptors([loaderInterceptor, notificationInterceptor])),
  ],
};
