import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/layout/shared/shared.module';
import {CandidatsComponent} from "./candidats.component";
import {CandidatsRoutingModule} from "./candidats-routing.module";



@NgModule({
  declarations: [
    CandidatsComponent
  ],
  imports: [
    CommonModule,
    CandidatsRoutingModule,
    SharedModule
],
})
export class CandidatsModule { }
