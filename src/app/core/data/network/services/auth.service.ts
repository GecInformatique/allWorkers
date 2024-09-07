import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseApi = "/auth";

  constructor(private http: HttpClient) { }

  login(data: any):Observable<any>{
    return this.http.post(environment.apiURL+this.baseApi+'/login', data);
  }

  changeMyPassword(data: any): Observable<any>{
    return this.http.post(environment.apiURL + this.baseApi +'/change-my-password', data);
  }

  getUserConnected(id: number): Observable<any> {
    return this.http.get(environment.apiURL + this.baseApi + '/me/' + id);
  }

}
