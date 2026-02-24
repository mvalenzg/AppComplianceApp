import { NotificationService } from './notification.service';
import { ErrorHandler, inject, Injectable, NgZone } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private readonly notificationService = inject(NotificationService);
  private readonly zone = inject(NgZone);

  handleError(error: any): void {
    console.error('Something went wrong: ', error);

    const message = error.message ? error.message : error.toString();

    this.zone.run(() => {
      this.notificationService.error(message, 'Something went wrong');
    });
  }
}
