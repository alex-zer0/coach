import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminCourse } from '../../../models';
import { Paged } from '../../../models/common';
import { BaseComponent } from '../../../BaseComponent';
import { AdminCourseGroup } from '../../../models/admin/course-group';
import { AdminCoursesGroupsService } from '../../../services/admin-course-groups.service';
import { AdminGroupCoursesData, CoachGroupCoursesResolve } from './coach-group-courses.resolve';

@Component({
  template: require('./coach-group-courses.component.html')
})
export class CoachGroupCoursesComponent extends BaseComponent {

  static resolve = {
    data: CoachGroupCoursesResolve
  };

  group: AdminCourseGroup;
  courses: Paged<AdminCourse>;

  constructor(private route: ActivatedRoute,
              private coursesGroups: AdminCoursesGroupsService) {
    super();
  }

  ngOnInit() {
    this.subscribesTo(
      // Изменение роута
      this.route.data.subscribe((res: {data: AdminGroupCoursesData}) => {
        this.group = res.data.group;
        this.courses = res.data.courses;
      })
    );
  }

  loadMore(page: number) {
    this.coursesGroups.getCoursesByGroupId(page).subscribe(newCourses => {
      this.courses = <Paged<AdminCourse>> this.courses.concat(newCourses);
      this.courses.$pagination = newCourses.$pagination;
    });
  }
}
