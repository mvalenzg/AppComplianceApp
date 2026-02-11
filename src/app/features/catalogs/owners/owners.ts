import { Component, computed, inject, signal } from '@angular/core';
import { IOwner, OwnerForm, OwnerTable } from './components';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { OwnerService } from './owner-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ConfirmationDialogService } from '../../../core';

@Component({
  selector: 'app-owners',
  imports: [ButtonModule, DialogModule, OwnerForm, OwnerTable],
  templateUrl: './owners.html',
  styleUrl: './owners.scss',
})
export class Owners {
  ownerService = inject(OwnerService);
  confirmationService = inject(ConfirmationDialogService);
  ownerResource = rxResource({
    stream: () => this.ownerService.get(),
    defaultValue: [],
  });
  displayModal = signal(false);
  selectedSite = signal<IOwner | null>(null);
  isEdit = computed(() => !!this.selectedSite());

  openCreate() {
    this.selectedSite.set(null);
    this.displayModal.set(true);
  }

  openEdit(site: IOwner) {
    this.selectedSite.set(site);
    this.displayModal.set(true);
  }

  handleSave(site: IOwner) {
    let request;
    if (this.isEdit()) {
      const { id, name, active } = site;
      request = this.ownerService.update(id, { name, active });
    } else {
      const { name } = site;
      request = this.ownerService.create({ name });
    }
    // Aquí llamas a tu ownerService (POST o PUT
    request.subscribe({
      next: () => {
        this.ownerResource.reload();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.displayModal.set(false);
      },
    });
  }

  handleDelete(id: string) {
    console.log(id);
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete site',
      acceptLabel: 'Delete',
      acceptIcon: 'pi pi-info-circle',
      severity: 'danger',
      accept: () => {
        const request = this.ownerService.delete(id);
        request.subscribe({
          next: () => {
            this.ownerResource.reload();
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            this.displayModal.set(false);
          },
        });
      },
    });
  }
}
