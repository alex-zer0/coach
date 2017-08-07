import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { routing } from './coach.routes';
import { CoachLayoutComponent } from './coach-layout.component';
import { CoachReviewTasksModule } from './review-tasks/coach-review-tasks.module';
import { CoachCoursesModule } from './courses/coach-courses.module';
import { AdminCourseViewerModule } from '../ui.admin/course-viewer/course-viewer.module';

@NgModule({
  imports: [
    SharedModule,
    CoachReviewTasksModule,
    CoachCoursesModule,
    AdminCourseViewerModule,
    routing
  ],
  declarations: [
    CoachLayoutComponent
  ]
})
export class CoachModule {
}
