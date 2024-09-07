import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/layout/shared/shared.module';
import {ProfessionComponent} from "./profession.component";
import {ProfessionRoutingModule} from "./profession-routing.module";
import {DomainActivityService, ProfessionService} from "../../../core/libs/scripts/libs/all-workers-api";



@NgModule({
  declarations: [
    ProfessionComponent
  ],
  imports: [
    CommonModule,
    ProfessionRoutingModule,
    SharedModule
],
  providers: [ProfessionService,DomainActivityService]
})
export class ProfessionModule { }
