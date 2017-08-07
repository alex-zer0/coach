import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../../BaseComponent';
import { CoachReviewTaskResolve } from './coach-review-task.resolve';
import { LessonToReview } from '../../../models/coach/lessonToReview';
import { CoachReviewTasksService } from '../../../services/coach-review-tasks.service';
import currentRole from '../../../utils/current-role';

@Component({
  templateUrl: './coach-review-task.component.html'
})
export class CoachReviewTaskComponent extends BaseComponent {
  static resolve = {
    lessonToReview: CoachReviewTaskResolve
  };

  private lessonToReview: LessonToReview;
  private reviewTaskId: number;
  private action: 'Correct' | 'Incorrect';
  private isVerified: boolean;
  private isLoading: boolean;
  private comment: string;

  get currentRole() {
    return currentRole(this.router);
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: CoachReviewTasksService) {
    super();
  }

  ngOnInit() {
    this.subscribesTo(
      this.route.data.subscribe((data: {lessonToReview: LessonToReview}) => {
        this.lessonToReview = data.lessonToReview;
      }),
      this.route.params.subscribe((data: {reviewTaskId: number}) => {
        this.reviewTaskId = data.reviewTaskId;
      })
    );
  }

  keypress(event: KeyboardEvent) {
    if (event && event.ctrlKey && (event.which === 10 || event.which === 13)) {
      this.completeReview(false);
    }
  }

  redirectToList() {
    if (this.currentRole === 'admin') {
      this.router.navigate(['/admin/courses', this.lessonToReview.courseId, 'review-tasks']);
    } else {
      this.router.navigate(['/coach/review-tasks']);
    }
  }

  completeReview(isAccepted: boolean) {
    if (this.isLoading) {
      return;
    }
    if (isAccepted || this.action === 'Incorrect') {
      let lessonReview = {isAccepted: isAccepted, comment: this.comment};
      this.isLoading = true;
      this.service.completeLessonReview(this.reviewTaskId, lessonReview).subscribe(() => {
        this.comment = this.isLoading = null;
        this.isVerified = true;
      });
    }
    this.action = isAccepted ? 'Correct' : 'Incorrect';
  }
}
