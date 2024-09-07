import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalAuthService {

  private currentUser = 'currentUser';

  public getCurrentUser(): any {
    const user = localStorage.getItem(this.currentUser);
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  }

  public removeCurrentUser(): void {
    localStorage.removeItem(this.currentUser);
  }


  public setCurrentUser(user: any): void {
    localStorage.setItem(this.currentUser, JSON.stringify(user));
  }


  public isAuhenticated(): boolean {
    const currentUser = this.getCurrentUser();
    if (currentUser  !== null) {
      return true;
    } else {
      return false;
    }
   
  }

}
