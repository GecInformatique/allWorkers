import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import {FormationRoutingModule} from "./formation-routing.module";
import {FormationComponent} from "./formation.component";
import {FormationService,

} from "../../../core/libs/scripts/libs/all-workers-api";


@NgModule({
  declarations: [
    FormationComponent
  ],
  imports: [
    CommonModule,
    FormationRoutingModule,
    SharedModule
  ],
  providers: [FormationService]
})
export class FormationModule { }
