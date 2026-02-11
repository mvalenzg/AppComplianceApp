import { inject, Injectable } from '@angular/core';
import { IOwner } from './components';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  http = inject(HttpClient);

  get(): Observable<IOwner[]> {
    return this.http.get<IOwner[]>(`${environment.apiUrl}/owners`);
  }

  create(site: { name: string }) {
    return this.http.post(`${environment.apiUrl}/owners`, site);
  }

  update(id: string, site: { name: string; active: boolean }) {
    return this.http.put(`${environment.apiUrl}/owners/${id}`, site);
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/owners/${id}`);
  }
}
