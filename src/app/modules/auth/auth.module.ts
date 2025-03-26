import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import {SharedModule} from "../../layout/shared/shared.module";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {
  CompetenceService,
  ProfessionService,
  SpecialismService
} from "../../core/libs/scripts/libs/all-workers-api";


@NgModule({
  declarations: [
    AuthComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent
  ],
  imports: [
    AuthRoutingModule,
    SharedModule,
    CommonModule,
  ],
  providers: [SpecialismService,ProfessionService,CompetenceService]

})
export class AuthModule { }
