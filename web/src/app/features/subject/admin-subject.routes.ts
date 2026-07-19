import { Route } from '@angular/router';
import { SubjectList } from './pages/subject-list/subject-list';

export const adminSubjectRoutes: Route[] = [
  {
    path: '',
    component: SubjectList,
    data: {
      title: 'Subjects',
    },
  },
];
