import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/layout/shared/shared.module';
import {ConditionComponent} from "./condition.component";
import {ConditionRoutingModule} from "./condition-routing.module";
import {ConditionService, NewsletterService} from "../../../core/libs/scripts/libs/all-workers-api";



@NgModule({
  declarations: [
    ConditionComponent
  ],
  imports: [
    CommonModule,
    ConditionRoutingModule,
    SharedModule
],
  providers: [ConditionService]
})
export class ConditionModule { }
