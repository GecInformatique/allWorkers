import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import {FormationDetailRoutingModule} from "./formation-detail-routing.module";
import {FormationDetailComponent} from "./formation-detail.component";


@NgModule({
  declarations: [
    FormationDetailComponent
  ],
  imports: [
    CommonModule,
    FormationDetailRoutingModule,
    SharedModule
  ]
})
export class FormationDetailModule { }
