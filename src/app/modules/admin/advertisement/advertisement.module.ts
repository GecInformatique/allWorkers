import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/layout/shared/shared.module';
import {AdvertisementComponent} from "./advertisement.component";
import {AdvertisementRoutingModule} from "./advertisement-routing.module";
import {AdvertisementService} from "../../../core/libs/scripts/libs/all-workers-api";



@NgModule({
  declarations: [
    AdvertisementComponent
  ],
  imports: [
    CommonModule,
    AdvertisementRoutingModule,
    SharedModule
],
  providers: [AdvertisementService]
})
export class AdvertisementModule { }
