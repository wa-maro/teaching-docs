import { Routes } from '@angular/router';
import { AdminLayout } from './layouts/admin-layout/admin-layout';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayout,

    children: [
      {
        path: 'subjects',
        loadChildren: () =>
          import('./features/subject/admin-subject.routes').then((m) => m.adminSubjectRoutes),
      },
    ],
  },
];
