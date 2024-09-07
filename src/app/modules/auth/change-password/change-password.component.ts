import { Component  } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent  {
  public password: boolean[] = [true];

  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }

  constructor(public Router: Router) { }
  loginFormSubmit(){
    this.Router.navigate(["employee_dashboard"])
  }

}
