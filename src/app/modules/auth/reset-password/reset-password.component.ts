import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  public password: boolean[] = [true];


  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }
  constructor(public Router: Router) { }
  loginFormSubmit(){
    this.Router.navigate(["employee/pages"])
  }
}
