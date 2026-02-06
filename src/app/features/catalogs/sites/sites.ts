import { Dashboard } from './../../dashboard/dashboard';
import { ConfirmationDialogService } from './../../../core/services/confirmation.dialog.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Component, computed, inject, resource, signal } from '@angular/core';
import { SiteService } from './site-service';
import { SiteTable } from './components';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SiteForm } from './components/site-form/site-form';
import { ISite } from './ISite.interface';

@Component({
  selector: 'app-sites',
  imports: [SiteTable, ButtonModule, SiteForm, DialogModule],
  templateUrl: './sites.html',
  styleUrl: './sites.scss',
})
export class Sites {
  siteService = inject(SiteService);
  confirmationService = inject(ConfirmationDialogService);
  siteResource = rxResource({
    stream: () => this.siteService.get(),
    defaultValue: [],
  });
  displayModal = signal(false);
  selectedSite = signal<ISite | null>(null);
  isEdit = computed(() => !!this.selectedSite());

  openCreate() {
    this.selectedSite.set(null);
    this.displayModal.set(true);
  }

  openEdit(site: ISite) {
    this.selectedSite.set(site);
    this.displayModal.set(true);
  }

  handleSave(site: ISite) {
    let request;
    if (this.isEdit()) {
      const { id, name, active } = site;
      request = this.siteService.update(id, { name, active });
    } else {
      const { name } = site;
      request = this.siteService.create({ name });
    }
    // Aquí llamas a tu SiteService (POST o PUT
    request.subscribe({
      next: () => {
        this.siteResource.reload();
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
        const request = this.siteService.delete(id);
        request.subscribe({
          next: () => {
            this.siteResource.reload();
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
