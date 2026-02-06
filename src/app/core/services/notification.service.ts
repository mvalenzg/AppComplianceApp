import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private messageService = inject(MessageService);

  success(detail: string, summary: string = 'Success!') {
    this.messageService.add({ severity: 'success', summary, detail, life: 3000 });
  }

  error(detail: string, summary: string = 'Error') {
    this.messageService.add({ severity: 'error', summary, detail, life: 5000 });
  }
}
