import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { NonAuthGuardService } from '../../router/guard/non-auth.guard';
import { LoginComponent } from './login/login.component';
import {RegisterComponent} from "./register/register.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";

const routes: Routes = [
  {
    path: '', component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent, canActivate: [NonAuthGuardService] },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [NonAuthGuardService] },
      { path: 'change-password', component: ChangePasswordComponent, canActivate: [NonAuthGuardService] },
      { path: 'reset-password', component: ResetPasswordComponent, canActivate: [NonAuthGuardService] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
