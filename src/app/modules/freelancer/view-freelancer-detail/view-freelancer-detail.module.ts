import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewFreelancerDetailComponent} from "./view-freelancer-detail.component";
import {ViewFreelancerDetailRoutingModule} from "./view-freelancer-detail-routing.module";
import {SharedModule} from "../../../shared/shared.module";



@NgModule({
  declarations: [
    ViewFreelancerDetailComponent
  ],
  imports: [
    CommonModule,
    ViewFreelancerDetailRoutingModule,
    SharedModule
  ]
})
export class ViewFreelancerDetailModule { }
