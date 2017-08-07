import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import currentRoute from '../../utils/current-route';

@Component({
  selector: 'coach-students-filter',
  template: `
    <div class="g-coach-students-filter">
      <a #stTrigger class="filter-handler">
        {{activeFilter}}
      </a>
      <tether-drop [trigger]="stTrigger">
        <ul>
          <li><a [routerLink]="[currentRoute]">Мои ученики</a></li>
          <li><a [routerLink]="[currentRoute, {allStudents: true}]">Все ученики</a></li>
        </ul>
      </tether-drop>
    </div>
    `
})
export class CoachStudentsFilterComponent {
  activeFilter: 'все ученики' | 'мои ученики';
  currentRoute: string;

  constructor(private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.currentRoute = currentRoute(this.router);
    this.route.params.subscribe(data => {
      //tslint:disable-next-line
      this.activeFilter = data['allStudents'] ? 'все ученики' : 'мои ученики';
    });
  }
}
