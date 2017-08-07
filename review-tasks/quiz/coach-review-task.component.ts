import moment from 'moment';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectAnswerSnapshot, SnapshotQuizAnswer, QuizQuestionReview } from '../../../models/coach/quizAttemptToReview';
import { BaseComponent } from '../../../BaseComponent';
import { CoachReviewTaskResolve, QuizAttemptToReviewWithUser } from './coach-review-task.resolve';
import { AnswerReviewStatus } from '../../../models/student/quiz-attempts';
import { CoachReviewTasksService } from '../../../services/coach-review-tasks.service';
import currentRole from '../../../utils/current-role';

@Component({
  templateUrl: './coach-review-task.component.html'
})
export class CoachReviewTaskComponent extends BaseComponent {

  static resolve = {
    quizAttempt: CoachReviewTaskResolve
  };

  private quizAttempt: QuizAttemptToReviewWithUser;
  private action: 'Correct' | 'Incorrect';
  private isVerified: boolean;
  private isLoading: boolean;
  private comment: string;

  get totalTimeToSolve() {
    let start = moment().startOf('day');
    let end = moment().startOf('day');
    this.quizAttempt.questions.forEach(q => {
      start.add(q.answer.timeToSolve.value, q.answer.timeToSolve.unit);
    });
    if (start.diff(end, 'minutes') > 0) {
      return start.diff(end, 'minutes') + ' мин';
    }
    return start.diff(end, 'seconds') + ' сек';
  }

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
      this.route.data.subscribe((data: {quizAttempt: QuizAttemptToReviewWithUser}) => {
        this.quizAttempt = data.quizAttempt;
      })
    );
  }

  isCorrectOption(question: SelectAnswerSnapshot, option: any) {
    return question.answer.answers.find(aUid => aUid === option.uid) && option.isCorrect;
  }

  isIncorrectOption(question: SelectAnswerSnapshot, option: any) {
    return question.answer.answers.find(aUid => aUid === option.uid) && !option.isCorrect;
  }

  setStatus(answer: SnapshotQuizAnswer, status: AnswerReviewStatus) {
    answer.status = status;
  }

  checkReview() {
    return !this.quizAttempt.questions.find(q => q.answer.status === 'NotReviewed');
  }

  keypress(event: KeyboardEvent) {
    if (event && event.ctrlKey && (event.which === 10 || event.which === 13)) {
      this.completeReview(false);
    }
  }

  redirectToList() {
    if (this.currentRole === 'admin') {
      this.router.navigate(['/admin/courses', this.quizAttempt.courseId, 'review-tasks']);
    } else {
      this.router.navigate(['/coach/review-tasks']);
    }
  }

  completeReview(isAccepted: boolean) {
    if (this.isLoading) {
      return;
    }
    if (isAccepted || this.action === 'Incorrect') {
      let quizReview = {reviews: this.prepareReviews(), isAccepted: isAccepted, comment: this.comment};
      this.isLoading = true;
      this.service.completeQuizReview(this.quizAttempt.reviewTaskId, quizReview).subscribe(() => {
        this.comment = this.isLoading = null;
        this.isVerified = true;
      });
    }
    this.action = isAccepted ? 'Correct' : 'Incorrect';
  }

  private prepareReviews = (): QuizQuestionReview[] => {
    return this.quizAttempt.questions.map(q => ({uid: q.uid, isCorrect: q.answer.status === 'Correct'}));
  };
}
