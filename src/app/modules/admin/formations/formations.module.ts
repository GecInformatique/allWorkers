import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/layout/shared/shared.module';
import {FormationsComponent} from "./formations.component";
import {FormationsRoutingModule} from "./formations-routing.module";
import {FormationService} from "../../../core/libs/scripts/libs/all-workers-api";



@NgModule({
  declarations: [
    FormationsComponent
  ],
  imports: [
    CommonModule,
    FormationsRoutingModule,
    SharedModule
],
  providers: [FormationService]
})
export class FormationsModule { }
