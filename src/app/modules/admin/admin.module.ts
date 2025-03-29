import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {TranslateModule} from "@ngx-translate/core";
import {ToastModule} from "primeng/toast";
import { AuthService } from 'src/app/core/libs/scripts/libs/all-workers-api';


@NgModule({
  declarations: [
    AdminComponent,
    SidemenuComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    TranslateModule,
    ToastModule,
  ],
  providers: [AuthService]

})
export class AdminModule { }
