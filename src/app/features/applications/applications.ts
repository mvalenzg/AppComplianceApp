import { Component, computed, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ApplicationForm } from './application-form/application-form';
import { IApplication } from './IApplication';
import { AppService } from './app.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ConfirmationDialogService } from '../../core';
import { ApplicationTable } from './application-table/application-table';

@Component({
  selector: 'app-applications',
  imports: [DialogModule, ButtonModule, ApplicationForm, ApplicationTable],
  templateUrl: './applications.html',
  styleUrl: './applications.scss',
})
export class Applications {
  displayModal = signal(false);
  selectedApp = signal<any | null>(null);
  isEdit = computed(() => !!this.selectedApp());
  private readonly appService = inject(AppService);
  private readonly confirmationService = inject(ConfirmationDialogService);

  appResource = rxResource({
    defaultValue: [],
    stream: () => this.appService.get(),
  });

  openCreate() {
    this.selectedApp.set(null);
    this.displayModal.update((v) => true);
  }

  openEdit(app: IApplication) {
    this.selectedApp.set(app);
    this.displayModal.set(true);
  }

  handleSave(app: IApplication) {
    let request;
    if (this.isEdit()) {
      const { id } = app;
      request = this.appService.update(id, app);
    } else {
      request = this.appService.create(app);
    }

    request.subscribe({
      next: () => {
        this.appResource.reload();
      },
      error: console.error,
      complete: () => {
        this.displayModal.set(false);
      },
    });
  }

  handleDelete(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Application',
      acceptLabel: 'Delete',
      acceptIcon: 'pi pi-info-circle',
      severity: 'danger',
      accept: () => {
        const request = this.appService.delete(id);
        request.subscribe({
          next: () => {
            this.appResource.reload();
          },
          error: console.error,
          complete: () => {
            this.displayModal.set(false);
          },
        });
      },
    });
  }
}
