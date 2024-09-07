import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/layout/shared/shared.module';
import {SpecialismeComponent} from "./specialisme.component";
import {SpecialismeRoutingModule} from "./specialisme-routing.module";
import {ProfessionService, SpecialismService} from "../../../core/libs/scripts/libs/all-workers-api";



@NgModule({
  declarations: [
    SpecialismeComponent
  ],
  imports: [
    CommonModule,
    SpecialismeRoutingModule,
    SharedModule
],
  providers: [SpecialismService,ProfessionService]

})
export class SpecialismeModule { }
