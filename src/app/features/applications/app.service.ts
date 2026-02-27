import { inject, Injectable } from '@angular/core';
import { IApplication } from './IApplication';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly http = inject(HttpClient);

  get(): Observable<IApplication[]> {
    return this.http.get<IApplication[]>(`${environment.apiUrl}/applications`);
  }

  create(app: IApplication): Observable<any> {
    return this.http.post(`${environment.apiUrl}/applications`, app);
  }

  update(id: string, app: IApplication): Observable<any> {
    return this.http.put(`${environment.apiUrl}/applications/${id}`, app);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/applications/${id}`);
  }
}
