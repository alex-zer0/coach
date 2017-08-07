import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CoachReviewTasksComponent } from './list/coach-review-tasks.component';
import { CoachStudentsFilterComponent } from './coach-students-filter.component';
import {CoachReviewTaskComponent as QuizTaskComponent } from './quiz/coach-review-task.component';
import {CoachReviewTaskComponent as LessonTaskComponent } from './lesson/coach-review-task.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CoachReviewTasksComponent,
    QuizTaskComponent,
    LessonTaskComponent,
    CoachStudentsFilterComponent
  ],
  providers: [
    Object.values(CoachReviewTasksComponent.resolve),
    Object.values(QuizTaskComponent.resolve),
    Object.values(LessonTaskComponent.resolve)
  ]
})
export class CoachReviewTasksModule {
}
