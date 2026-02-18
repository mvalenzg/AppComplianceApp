import { inject, Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  private confirmationService = inject(ConfirmationService);

  public confirm(options: {
    message: string;
    header?: string;
    acceptLabel?: string;
    acceptIcon?: string;
    severity?: 'danger' | 'info' | 'warn'; // Para cambiar entre Borrar o Confirmar
    accept: () => void;
    reject?: () => void;
  }) {
    this.confirmationService.confirm({
      header: options.header ?? 'are you sure?',
      message: options.message,
      icon: options.acceptIcon ?? 'pi pi-exclamation-triangle',
      closable: true,
      modal: true,
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: options.acceptLabel ?? 'Accept',
        severity: options.severity ?? 'danger', // Por defecto danger para borrados
      },
      accept: () => options.accept(),
      reject: () => {
        if (options.reject) options.reject();
      },
    });
  }
}
