import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RoleService, UserService} from "../../../core/libs/scripts/libs/all-workers-api";
import {SharedModule} from "../../../layout/shared/shared.module";
import {UsersComponent} from "./users.component";
import {UsersRoutingModule} from "./users-routing.module";



@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
]
  ,
  providers: [RoleService,UserService]
})
export class UsersModule { }
