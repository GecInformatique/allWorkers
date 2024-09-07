import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { RoleService} from "../../../core/libs/scripts/libs/all-workers-api";
import {SharedModule} from "../../../layout/shared/shared.module";



@NgModule({
  declarations: [
    RolesComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    SharedModule
]
  ,
  providers: [RoleService]
})
export class RolesModule { }
