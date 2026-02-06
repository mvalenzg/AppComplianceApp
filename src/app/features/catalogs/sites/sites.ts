import { rxResource } from '@angular/core/rxjs-interop';
import { Component, computed, inject, resource, signal } from '@angular/core';
import { SiteService } from './site-service';
import { SiteTable } from './components';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SiteForm } from './components/site-form/site-form';
import { ISite } from './ISite.interface';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-sites',
  imports: [SiteTable, ButtonModule, SiteForm, DialogModule],
  templateUrl: './sites.html',
  styleUrl: './sites.scss',
})
export class Sites {
  siteService = inject(SiteService);

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
      request = this.siteService.update(site);
    } else {
      const { name } = site;
      request = this.siteService.create({ name });
    }
    // Aquí llamas a tu SiteService (POST o PUT
    request.subscribe({
      next: () => {
        this.siteResource.reload();
        const message = this.isEdit()
          ? 'Site was updated successfully'
          : 'Site was created succssfully';
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.displayModal.set(false);
      },
    });
  }
}
