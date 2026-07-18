import { Route } from '@angular/router';
import { ListSubjects } from './pages/subject-list/subject-list';

export const adminSubjectRoutes: Route[] = [
  {
    path: '',
    component: ListSubjects,
  },
];
