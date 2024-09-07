import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './faq.component';
import {QuestionService} from "../../../core/libs/scripts/libs/all-workers-api";


@NgModule({
  declarations: [
    FaqComponent
  ],
  imports: [
    CommonModule,
    FaqRoutingModule
  ],
  providers:[QuestionService]
})
export class FaqModule { }
