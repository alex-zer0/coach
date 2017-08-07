import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminCourse } from '../../../models';
import { Paged } from '../../../models/common';
import { BaseComponent } from '../../../BaseComponent';
import { AdminCoursesService } from '../../../services/admin-courses.service';
import { AdminCourseGroup } from '../../../models/admin/course-group';
import { AdminCoursesData, CoachCoursesResolve } from './coach-courses.resolve';

@Component({
  template: require('./coach-courses.component.html')
})
export class CoachCoursesComponent extends BaseComponent implements OnInit {

  static resolve = {
    data: CoachCoursesResolve
  };

  groups: Paged<AdminCourseGroup>;
  courses: Paged<AdminCourse>;

  get isEmpty() {
    return !this.courses.length && !this.groups.length;
  }

  constructor(private route: ActivatedRoute,
              private adminCourses: AdminCoursesService) {
    super();
  }

  ngOnInit() {
    this.subscribesTo(
      // Изменение роута
      this.route.data.subscribe((res: {data: AdminCoursesData}) => {
        this.groups = res.data.groups;
        this.courses = res.data.courses;
      })
    );
  }

  loadMore(page: number) {
    this.adminCourses.getCoursesWithoutGroup(page).subscribe(newCourses => {
      this.courses = <Paged<AdminCourse>> this.courses.concat(newCourses);
      this.courses.$pagination = newCourses.$pagination;
    });
  }
}
