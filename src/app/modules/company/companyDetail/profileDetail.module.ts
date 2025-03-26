import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from 'src/app/shared/shared.module';
import {ProfileDetailComponent} from "./profileDetail.component";
import {ProfileDetailRoutingModule} from "./profileDetail-routing.module";


@NgModule({
  declarations: [
    ProfileDetailComponent
  ],
  imports: [
    CommonModule,
    ProfileDetailRoutingModule,
    SharedModule
  ]
})
export class ProfileDetailModule { }
