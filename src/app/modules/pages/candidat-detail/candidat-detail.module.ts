import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import {CandidatDetailRoutingModule} from "./candidat-detail-routing.module";
import {CandidatDetailComponent} from "./candidat-detail.component";


@NgModule({
  declarations: [
    CandidatDetailComponent
  ],
  imports: [
    CommonModule,
    CandidatDetailRoutingModule,
    SharedModule
  ]
})
export class CandidatDetailModule { }
