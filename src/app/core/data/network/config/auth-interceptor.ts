import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LocalTokenService} from "../../local/local.token.service";
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})export class AuthInterceptor implements HttpInterceptor {

  constructor(private localTokenService: LocalTokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localTokenService.getToken();

    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': environment.appUrl
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const requestChange = req.clone({ headers });
    return next.handle(requestChange);
  }
}
