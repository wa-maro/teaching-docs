import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'subjects',
        loadChildren: () =>
          import('./features/subject/admin-subject.routes').then((m) => m.adminSubjectRoutes),
      },
    ],
  },
];
