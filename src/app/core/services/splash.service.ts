import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SplashService {
  hide(): void {
    const splash = document.getElementById('app-splash');
    if (!splash) return;

    splash.classList.add('hide');

    setTimeout(() => splash.remove(), 400);
  }
}
