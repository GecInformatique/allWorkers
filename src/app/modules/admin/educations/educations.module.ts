import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/layout/shared/shared.module';
import {EducationsComponent} from "./educations.component";
import {EducationsRoutingModule} from "./educations-routing.module";
import {EducationService, PackageService} from "../../../core/libs/scripts/libs/all-workers-api";



@NgModule({
  declarations: [
    EducationsComponent
  ],
  imports: [
    CommonModule,
    EducationsRoutingModule,
    SharedModule
],
  providers: [EducationService]
})
export class EducationsModule { }
