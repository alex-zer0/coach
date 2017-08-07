//tslint:disable:no-string-literal
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CoachReviewTasksService } from '../../../services/coach-review-tasks.service';
import { LessonToReview } from '../../../models/coach/lessonToReview';
import { AdminOrgMembersService } from '../../../services/admin-org-members.service';
import { AdminOrgMember } from '../../../models/admin/basic';

@Injectable()
export class CoachReviewTaskResolve implements Resolve<LessonToReview> {
  constructor(private service: CoachReviewTasksService,
              private members: AdminOrgMembersService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LessonToReview> {
    let reviewTaskId = Number(route.params['reviewTaskId']);
    return this.service.lessonToReview(reviewTaskId)
      .flatMap((lessonToReview: LessonToReview) => {
        return this.members.getOrgMember(lessonToReview.studentId)
          .map((user: AdminOrgMember) => {
            return {...lessonToReview, user: user};
          });
      });
  }
}
