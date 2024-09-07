import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/layout/shared/shared.module';
import {ReviewsComponent} from "./reviews.component";
import {ReviewsRoutingModule} from "./reviews-routing.module";



@NgModule({
  declarations: [
    ReviewsComponent
  ],
  imports: [
    CommonModule,
    ReviewsRoutingModule,
    SharedModule
]
})
export class ReviewsModule { }
