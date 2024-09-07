import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/layout/shared/shared.module';
import {CompetenceComponent} from "./competence.component";
import {CompetenceRoutingModule} from "./competence-routing.module";
import {CompetenceService, EducationService} from "../../../core/libs/scripts/libs/all-workers-api";



@NgModule({
  declarations: [
    CompetenceComponent
  ],
  imports: [
    CommonModule,
    CompetenceRoutingModule,
    SharedModule
]
  ,
  providers: [CompetenceService]
})
export class CompetenceModule { }
