import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotificationService } from '../services';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = '';
      if (error.error instanceof ErrorEvent) {
        errorMsg = `Error: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 401:
            errorMsg = 'Session Expired. please Log in again.';
            break;
          case 403:
            errorMsg = "You don't have access to realize this action.";
            break;
          case 500:
            errorMsg = 'Internal server error. Tray again later';
            break;
          default:
            errorMsg = error.message || 'Server error';
        }
      }
      notificationService.error(errorMsg, `Server: ${error.status}`);
      return throwError(() => error);
    }),
  );
};
