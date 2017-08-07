import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AdminCourse } from '../../../models';
import { AdminCoursesService } from '../../../services/admin-courses.service';
import { Paged } from '../../../models';
import { AdminCoursesGroupsService } from '../../../services/admin-course-groups.service';
import { AdminCourseGroup } from '../../../models/admin/course-group';

export type AdminCoursesData = {
  groups: Paged<AdminCourseGroup>,
  courses: Paged<AdminCourse>
}

@Injectable()
export class CoachCoursesResolve implements Resolve<AdminCoursesData> {
  constructor(private adminCourses: AdminCoursesService,
              private coursesGroups: AdminCoursesGroupsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AdminCoursesData> {
    let groups = this.coursesGroups.findAll();
    let courses = this.adminCourses.getCoursesWithoutGroup();

    return Observable.combineLatest(groups, courses, (groupsT, coursesT) => {
      return {
        groups: groupsT,
        courses: coursesT
      }
    });
  }
}
