import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {LocalTokenService} from "../../core/data/local/local.token.service";
import {LocalAuthService} from "../../core/data/local/local.auth.service";

@Injectable({
  providedIn: 'root'
})
export class NonAuthGuardService implements CanActivate {

  constructor(private router: Router,
              private localTokenService: LocalTokenService,
              private localAuthService: LocalAuthService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.localTokenService.getToken();
    const isAuthenticated = this.localAuthService.isAuhenticated();
    /*if (isAuthenticated && token !== null) {
      this.router.navigate(['/']);
      return false;
    }*/
    return true;
  }
}
