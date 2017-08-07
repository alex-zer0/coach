import { OrgRoles } from '../models/security';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Auth } from '../auth/Auth.service';

@Injectable()
export class CanActivateCoach implements CanActivate {
  constructor(private auth: Auth,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    switch (this.auth.userSession.role) {
      case OrgRoles.Student:
        this.router.navigate(['../study']);
        return false;
      default:
        return true;
    }
  }
}
