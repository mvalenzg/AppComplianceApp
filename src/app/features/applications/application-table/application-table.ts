import { Table, TableModule } from 'primeng/table';
import { IApplication } from './../IApplication';
import { Component, input, output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { SeverityPipe } from '../../../core';

@Component({
  selector: 'app-application-table',
  imports: [
    TableModule,
    SkeletonModule,
    ButtonModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    SeverityPipe,
  ],
  templateUrl: './application-table.html',
  styleUrl: './application-table.scss',
})
export class ApplicationTable {
  apps = input<IApplication[]>([]);
  loading = input<boolean>();
  delete = output<string>();
  edit = output<IApplication>();
  skeletonRows = Array.from({ length: 6 });
  searchValue = signal('');

  confirmEdit(app: IApplication) {
    this.edit.emit(app);
  }

  confirmDelete(id: string) {
    this.delete.emit(id);
  }

  clear(table: Table) {
    table.clear();
    this.searchValue.set('');
  }
}
