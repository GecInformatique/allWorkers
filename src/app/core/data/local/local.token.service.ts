import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalTokenService {

  private token = 'token';

  public getToken(): any {
    const token = localStorage.getItem(this.token);
    // Check if token is null or empty before parsing
    return token ? JSON.parse(token) : null;
  }

  public removeToken(): void {
    localStorage.removeItem(this.token);
  }

  public setToken(token: any): void {
    // Ensure token is properly serialized if needed
    localStorage.setItem(this.token, JSON.stringify(token));
  }

}
