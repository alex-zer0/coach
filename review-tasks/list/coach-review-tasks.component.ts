import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachReviewTasksResolve } from './coach-review-tasks.resolve';
import { BaseComponent } from '../../../BaseComponent';
import { ReviewTasksWithUserAndCoachByCourse } from '../../model';
import { ReviewTask } from '../../../models/coach/reviewTasks';
import { Auth } from '../../../auth/Auth.service';

@Component({
  templateUrl: './coach-review-tasks.component.html'
})
export class CoachReviewTasksComponent extends BaseComponent {
  static resolve = {
    reviewTasks: CoachReviewTasksResolve
  };

  reviewTasks: ReviewTasksWithUserAndCoachByCourse[];

  constructor(private route: ActivatedRoute,
              private auth: Auth,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.subscribesTo(
      this.route.data.subscribe((data: {reviewTasks: ReviewTasksWithUserAndCoachByCourse[]}) => {
        this.reviewTasks = data.reviewTasks;
      })
    );
  }
  goToReview(task: ReviewTask) {
    this.router.navigate([
      task.reviewTaskId,
      task.reviewType === 'QuizReviewTaskType'
        ? 'quiz'
        : 'lesson'
    ], {relativeTo: this.route});
  }
}
