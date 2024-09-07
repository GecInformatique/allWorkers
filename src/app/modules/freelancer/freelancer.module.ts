import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreelancerRoutingModule } from './freelancer-routing.module';
import { FreelancerComponent } from './freelancer.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import {FreelancerheaderComponent} from "../../layout/freelancerheader/freelancerheader.component";
import {FeaturesModulesModule} from "../features-modules.module";


@NgModule({
  declarations: [
    FreelancerComponent,
    FreelancerheaderComponent,
    SidemenuComponent
  ],
    imports: [
        CommonModule,
        FreelancerRoutingModule,
        FeaturesModulesModule
    ]
})
export class FreelancerModule { }
