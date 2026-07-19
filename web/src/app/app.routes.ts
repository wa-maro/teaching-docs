import { Routes } from '@angular/router';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { AdminDashboard } from './features/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayout,

    children: [
      {
        path: 'dashboard',
        component: AdminDashboard,
        data: {
          title: 'Dashboard',
        },
      },
      {
        path: 'subjects',
        loadChildren: () =>
          import('./features/subject/admin-subject.routes').then((m) => m.adminSubjectRoutes),
      },
    ],
  },
];
