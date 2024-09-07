import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {SharedModule} from "../../../layout/shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {
  DomainActivityService,
  FormationService,
  QuestionService
} from "../../../core/libs/scripts/libs/all-workers-api";



@NgModule({
  declarations: [
    HomeComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CarouselModule,
    TranslateModule,
    SharedModule


  ],
  providers: [DomainActivityService,QuestionService,FormationService]
})
export class HomeModule { }
