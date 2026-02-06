import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISite } from './ISite.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SiteService {
  http = inject(HttpClient);

  get(): Observable<ISite[]> {
    return this.http.get<ISite[]>(`${environment.apiUrl}/sites`);
  }

  create(site: { name: string }) {
    return this.http.post(`${environment.apiUrl}/sites`, site);
  }

  update(id: string, site: { name: string; active: boolean }) {
    return this.http.put(`${environment.apiUrl}/sites/${id}`, site);
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/sites/${id}`);
  }
}
