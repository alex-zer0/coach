import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AdminCourse } from '../../../models';
import { Paged } from '../../../models';
import { AdminCoursesGroupsService } from '../../../services/admin-course-groups.service';
import { AdminCourseGroup } from '../../../models/admin/course-group';

export type AdminGroupCoursesData = {
  group: AdminCourseGroup,
  courses: Paged<AdminCourse>
}

@Injectable()
export class CoachGroupCoursesResolve implements Resolve<AdminGroupCoursesData> {
  constructor(private service: AdminCoursesGroupsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AdminGroupCoursesData> {
    const key: string = 'groupId';
    let groupId = Number(route.params[key]);

    let group = this.service.findById(groupId);
    let courses = this.service.getCoursesByGroupId(groupId);

    return Observable.combineLatest(group, courses, (groupT, coursesT) => {
      return {
        group: groupT,
        courses: coursesT
      }
    });
  }
}
