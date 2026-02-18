import { Component, DOCUMENT, Inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('app-compliance');

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    const splash = this.document.getElementById('global-splash');

    if (splash) {
      splash.style.opacity = '0';
      setTimeout(() => splash.remove(), 500);
    }
  }
}
