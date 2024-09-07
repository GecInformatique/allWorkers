import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/layout/shared/shared.module';
import {QuestionsComponent} from "./questions.component";
import {QuestionsRoutingModule} from "./questions-routing.module";
import {QuestionService} from "../../../core/libs/scripts/libs/all-workers-api";



@NgModule({
  declarations: [
    QuestionsComponent
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    SharedModule
],
  providers: [QuestionService]
})
export class QuestionsModule { }
