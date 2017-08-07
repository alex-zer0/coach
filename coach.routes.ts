import { Routes, RouterModule } from '@angular/router';
import { CoachLayoutComponent } from './coach-layout.component';
import { CoachReviewTasksComponent } from './review-tasks/list/coach-review-tasks.component';
import {CoachReviewTaskComponent as CoachQuizComponent } from './review-tasks/quiz/coach-review-task.component';
import {CoachReviewTaskComponent as CoachLessonComponent } from './review-tasks/lesson/coach-review-task.component';
import { ConversationComponent } from '../shared/components/conversation/conversation.component';
import { NotificationsComponent } from '../shared/components/notifications/notifications.component';
import { CoachCoursesComponent } from './courses/list/coach-courses.component';
import { CoachGroupCoursesComponent } from './courses/group/coach-group-courses.component';
import { AdminCourseViewerComponent } from '../ui.admin/course-viewer/course-viewer.component';

const appRoutes: Routes = [
  {
    path: '', component: CoachLayoutComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'review-tasks'},
      {
        path: 'review-tasks',
        children: [
          {
            path: '',
            component: CoachReviewTasksComponent,
            resolve: CoachReviewTasksComponent.resolve
          }, {
            path: ':reviewTaskId/lesson',
            component: CoachLessonComponent,
            resolve: CoachLessonComponent.resolve
          }, {
            path: ':reviewTaskId/quiz',
            component: CoachQuizComponent,
            resolve: CoachQuizComponent.resolve
          }
        ]
      },
      /* Беседы */
      {
        path: 'conversation',
        component: ConversationComponent,
        resolve: ConversationComponent.resolve
      },
      /* События */
      {
        path: 'notifications',
        component: NotificationsComponent,
        resolve: NotificationsComponent.resolve
      },
      {
        path: 'courses',
        children: [
          {
            path: '',
            component: CoachCoursesComponent,
            resolve: CoachCoursesComponent.resolve
          },
          {
            path: 'groups/:groupId',
            component: CoachGroupCoursesComponent,
            resolve: CoachGroupCoursesComponent.resolve
          },
          {
            path: ':courseId/preview',
            component: AdminCourseViewerComponent,
            resolve: AdminCourseViewerComponent.resolve
          }
        ]
      }
    ]
  }
];

export const routing = RouterModule.forChild(appRoutes);
