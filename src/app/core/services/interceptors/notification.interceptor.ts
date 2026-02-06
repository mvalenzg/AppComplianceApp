import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap, catchError, throwError } from 'rxjs';
import { NotificationService } from '../notification.service';

export const notificationInterceptor: HttpInterceptorFn = (req, next) => {
  const notification = inject(NotificationService);

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse && ['POST', 'PUT', 'DELETE'].includes(req.method)) {
        notification.success('Operación realizada con éxito');
      }
    }),
    catchError((error) => {
      notification.error(error.error?.message || 'Ocurrió un error inesperado');
      return throwError(() => error);
    }),
  );
};
