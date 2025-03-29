import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatListRoutingModule } from './candidat-list-routing.module';
import {CandidatListComponent} from "./candidat-list.component";
import {
  DomainActivityService,
  SpecialismService
} from "../../../core/libs/scripts/libs/all-workers-api";
import {SharedModule} from "../../../layout/shared/shared.module";


@NgModule({
  declarations: [
    CandidatListComponent
  ],
  imports: [
    CommonModule,
    CandidatListRoutingModule,
    SharedModule
  ],
  providers: [SpecialismService,DomainActivityService]
})
export class CandidatListModule { }
