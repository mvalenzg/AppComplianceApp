import { MainLayout } from './layout/main-layout/main-layout';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then((c) => c.Dashboard),
      },
      {
        path: 'applications',
        loadComponent: () =>
          import('./features/applications/applications').then((c) => c.Applications),
      },
      {
        path: 'catalogs/sites',
        loadComponent: () => import('./features/catalogs/sites/sites').then((c) => c.Sites),
      },
      {
        path: 'catalogs/devs',
        loadComponent: () => import('./features/catalogs/owners/owners').then((c) => c.Owners),
      },
      {
        path: '404',
        loadComponent: () =>
          import('./core/components/not-found/not-found').then((c) => c.NotFound),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
