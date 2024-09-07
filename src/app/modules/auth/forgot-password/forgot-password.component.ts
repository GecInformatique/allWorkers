import { Component,} from '@angular/core';

import {  Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent  {

  constructor(public Router: Router) { }
  loginFormSubmit(){
  //  this.Router.navigate([routes.employee_dashboard])
  }
}
