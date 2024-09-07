import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/layout/shared/shared.module';
import {TestimonialComponent} from "./testimonial.component";
import {TestimonialRoutingModule} from "./testimonial-routing.module";



@NgModule({
  declarations: [
    TestimonialComponent
  ],
  imports: [
    CommonModule,
    TestimonialRoutingModule,
    SharedModule
]
})
export class TestimonialModule { }
