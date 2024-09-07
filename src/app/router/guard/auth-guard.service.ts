import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import {LocalAuthService} from '../../core/data/local/local.auth.service'
import {LocalTokenService} from "../../core/data/local/local.token.service";

@Injectable({providedIn: 'root'})

export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private localAuthService: LocalAuthService,private localTokenService: LocalTokenService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthenticated = this.localAuthService.isAuhenticated();
    const token = this.localTokenService.getToken();

    if (!isAuthenticated && token === null) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;

  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean{
    return this.canActivate(route, state);
  }
}
