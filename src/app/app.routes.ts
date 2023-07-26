import { Routes } from '@angular/router';
import CountryListComponent from './pages/country-list/country-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/countries',
    pathMatch: 'full',
  },
  {
    path: 'countries',
    component: CountryListComponent,
  },
  {
    path: 'countries/:id',
    loadComponent: () =>
      import('./pages/country-detail/country-detail.component')
  },
];
