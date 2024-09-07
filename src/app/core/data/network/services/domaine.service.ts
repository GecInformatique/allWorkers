import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DomaineService {

  private baseApi = "/zone";

  constructor(private http: HttpClient) { }


  fetchAll(): Observable<any> {
    return this.http.get(environment.apiURL + this.baseApi + '/all');
  }

  fetchZoneByIdLieu(codeLieu: any): Observable<any> {
    return this.http.get(environment.apiURL + this.baseApi + '/all-zone-by-lieu/' + codeLieu);
  }


  create(payload: any){
    return this.http.post<any>(environment.apiURL + this.baseApi + '/create', payload);
  }

  update(payload: any): Observable<any> {
    return this.http.put(environment.apiURL + this.baseApi + '/update', payload);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(environment.apiURL + this.baseApi + '/delete/' + id);
  }

  deleteManyItem(ids: string): Observable<any> {
    return this.http.delete(environment.apiURL + this.baseApi + '/delete-many-item/' + ids);
  }
}
