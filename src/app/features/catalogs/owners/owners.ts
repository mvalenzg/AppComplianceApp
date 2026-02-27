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
  selectedOwner = signal<IOwner | null>(null);
  isEdit = computed(() => !!this.selectedOwner());

  openCreate() {
    this.selectedOwner.set(null);
    this.displayModal.set(true);
  }

  openEdit(owner: IOwner) {
    this.selectedOwner.set(owner);
    this.displayModal.set(true);
  }

  handleSave(owner: IOwner) {
    let request;
    if (this.isEdit()) {
      const { id, fullName, active } = owner;
      request = this.ownerService.update(id, { name: fullName, active });
    } else {
      const { fullName } = owner;
      request = this.ownerService.create({ name: fullName });
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
      header: 'Delete Dev',
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
