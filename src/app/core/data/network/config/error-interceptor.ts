import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalAuthService } from '../../local/local.auth.service';
import { LocalTokenService } from '../../local/local.token.service';
import { FunctionHelpers } from '../../../helpers/function-helpers';
import {ToasterService} from "../../../tools/toast/toaster.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toasterService: ToasterService,
    private authService: LocalAuthService,
    private tokenService: LocalTokenService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {

      if (err.status === 404) {
        this.toasterService.showError("Please contact system administrator.");
      }

      if (err.status === 500) {
        this.authService.removeCurrentUser();
        this.tokenService.removeToken();
        this.router.navigate(['/error/error-system']);
        this.toasterService.showError("Veuillez contacter l'administrateur du système");
      }


      if (err.status === 503) {
        this.router.navigate(['/error/error-system']);
        this.toasterService.showError( "Veuillez contacter l'administrateur du système.");
      }


      if (err.status === 401 || err.status === 0) {
        this.authService.removeCurrentUser();
        this.tokenService.removeToken();
        this.router.navigate(['/login']);
        FunctionHelpers.forceReloadApp()
        this.toasterService.showError("Veuillez vous authentifier SVP !");
      }

      if (err.status === 400 && err.error) {
        this.toasterService.showError( err.error.message);
      }
      return throwError(err);
    }));
  }

}
