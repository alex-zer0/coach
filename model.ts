import { QuizReviewTask, LessonReviewTask } from '../models/coach/reviewTasks';
import { User } from '../models/security';

export interface ReviewTasksWithUserAndCoachByCourse {
  courseId: number,
  title: string,
  tasks: ReviewTaskWithStudentAndCoach[]
}

export type ReviewTaskWithStudentAndCoach = (QuizReviewTask | LessonReviewTask) & {student: User, coach: User};
