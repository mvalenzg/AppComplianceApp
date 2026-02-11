import { IOwner } from './../IOwner.interface';
import { Component, input, output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { StatusValuePipe, SeverityPipe } from '../../../../../core';

@Component({
  selector: 'app-owner-table',
  imports: [
    TableModule,
    SkeletonModule,
    ButtonModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    StatusValuePipe,
    SeverityPipe,
  ],
  templateUrl: './owner-table.html',
  styleUrl: './owner-table.scss',
})
export class OwnerTable {
  owners = input<IOwner[]>([]);
  loading = input<boolean>();
  onDelete = output<string>();
  onEdit = output<IOwner>();
  searchValue = signal('');

  confirmEdit(owner: IOwner) {
    this.onEdit.emit(owner);
  }

  confirmDelete(id: string) {
    this.onDelete.emit(id);
  }

  clear(table: Table) {
    table.clear();
    this.searchValue.set('');
  }
}
