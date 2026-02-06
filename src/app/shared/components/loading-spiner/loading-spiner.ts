import { LoaderService } from './../../../core/services/loader.service';
import { Component, inject } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-loading-spiner',
  imports: [ProgressSpinnerModule],
  templateUrl: './loading-spiner.html',
  styleUrl: './loading-spiner.scss',
})
export class LoadingSpiner {
  loaderService = inject(LoaderService);
}
