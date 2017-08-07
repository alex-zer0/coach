import moment from 'moment-timezone';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ReviewTasksByCourse, ReviewTask } from '../../../models/coach/reviewTasks';
import { CoachReviewTasksService } from '../../../services/coach-review-tasks.service';
import { UsersService } from '../../../services/users.service';
import { ReviewTasksWithUserAndCoachByCourse, ReviewTaskWithStudentAndCoach } from '../../model';
import { User } from '../../../models/security';

const checkMore30H = (time: string) => {
    return moment().diff(moment(time), 'hours') > 30;
};

@Injectable()
export class CoachReviewTasksResolve implements Resolve<ReviewTasksByCourse[]> {
  constructor(private service: CoachReviewTasksService,
              private users: UsersService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ReviewTasksWithUserAndCoachByCourse[]> {
    return this.service.tasks(<any> route.params)
      .flatMap((tasksByCourse: ReviewTasksByCourse[]) => {
        // Фикс для проблемы sequence with no elements
        if (!tasksByCourse.length) {
          return Observable.of([]);
        }
        // Собираем ID всех студентов & тренеров
        let userIds: number[] = [];
        tasksByCourse.forEach(byCourse => {
          byCourse.tasks.forEach(t => {
            userIds.push(t.studentId);
            userIds.push(t.coachId);
          });
        });

        // Теперь по каждому из ID вытащим всех студентов и
        return Observable
          .from(userIds)
          .distinct() // Только уникальные
          .map(id => this.users.getUserInfoById(id))
          .combineAll() // Объединяем все в один
          .map((users: User[]) => {

            // Эта функция нужна для type-safe проверки
            let addStudentAndCoach = (task: ReviewTask): ReviewTaskWithStudentAndCoach => {
              let student = users.find(u => u.id === task.studentId);
              let coach = users.find(u => u.id === task.coachId);
              return {
                ...task,
                student: student,
                coach: coach,
                isWarnTime: checkMore30H(task.createdAt)
              }
            };

            // Эта функция нужна для type-safe проверки
            let processTasks = (byCourse: ReviewTasksByCourse): ReviewTasksWithUserAndCoachByCourse => {
              let withStudents = byCourse.tasks.map(addStudentAndCoach);
              return {
                ...byCourse,
                tasks: withStudents
              }
            };

            // Теперь пробегаемся по каждому курсу и в каждую задачу вставляем студента
            return tasksByCourse.map(processTasks);
          });
      });
  }
}
