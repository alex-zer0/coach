//tslint:disable:no-string-literal
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { QuizAttemptToReview } from '../../../models/coach/quizAttemptToReview';
import { CoachReviewTasksService } from '../../../services/coach-review-tasks.service';
import { AdminOrgMember } from '../../../models/admin/basic';
import { AdminOrgMembersService } from '../../../services/admin-org-members.service';

export interface QuizAttemptToReviewWithUser extends QuizAttemptToReview {
  reviewTaskId: number,
  user: AdminOrgMember
}

@Injectable()
export class CoachReviewTaskResolve implements Resolve<QuizAttemptToReviewWithUser> {
  constructor(private service: CoachReviewTasksService,
              private members: AdminOrgMembersService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QuizAttemptToReviewWithUser> {
    let reviewTaskId = Number(route.params['reviewTaskId']);
    return this.service.quizToReview(reviewTaskId).flatMap((quizAttempt: QuizAttemptToReview) => {
      return this.members.getOrgMember(quizAttempt.userId)
        .map((user: AdminOrgMember) => {
          return {...quizAttempt, user: user, reviewTaskId: reviewTaskId};
        });
    });
  }
}
