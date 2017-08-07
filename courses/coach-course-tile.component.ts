import { Component, Input } from '@angular/core';
import { AdminCourse } from '../../models/admin/course';

@Component({
  selector: '.coach-course-tile',
  templateUrl: './coach-course-tile.component.html'
})
export class CoachCourseTileComponent {
  @Input() course: AdminCourse;
}
