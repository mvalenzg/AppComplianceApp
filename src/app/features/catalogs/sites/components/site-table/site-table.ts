import { Component, input, output, signal } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { ISite } from '../../ISite.interface';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-site-table',
  imports: [
    TableModule,
    SkeletonModule,
    ButtonModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  templateUrl: './site-table.html',
  styleUrl: './site-table.scss',
})
export class SiteTable {
  sites = input<ISite[]>([]);
  loading = input<boolean>();
  onDelete = output<string>();
  onEdit = output<ISite>();
  searchValue = signal(''); //no estoy seguro

  confirmEdit(site: ISite) {
    this.onEdit.emit(site);
  }

  confirmDelete(id: string) {
    this.onDelete.emit(id);
  }

  clear(table: Table) {
    table.clear();
    this.searchValue.set('');
  }

  getSeverity(status: boolean) {
    return status ? 'success' : 'danger';
  }

  getValue(status: boolean) {
    return status ? 'Active' : 'Inactive';
  }
}
