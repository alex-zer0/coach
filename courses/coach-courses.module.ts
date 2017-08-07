import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CoachCoursesComponent } from './list/coach-courses.component';
import { CoachGroupCoursesComponent } from './group/coach-group-courses.component';
import { CoachCourseTileComponent } from './coach-course-tile.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CoachCoursesComponent,
    CoachGroupCoursesComponent,
    CoachCourseTileComponent
  ],
  providers: [
    Object.values(CoachCoursesComponent.resolve),
    Object.values(CoachGroupCoursesComponent.resolve)
  ],
  exports: [
    CoachCoursesComponent,
    CoachGroupCoursesComponent,
    CoachCourseTileComponent
  ]
})
export class CoachCoursesModule {
}
