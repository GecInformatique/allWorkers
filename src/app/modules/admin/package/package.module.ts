import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/layout/shared/shared.module';
import {PackageComponent} from "./package.component";
import {PackageRoutingModule} from "./package-routing.module";
import {PackageService, PaymentService} from "../../../core/libs/scripts/libs/all-workers-api";



@NgModule({
  declarations: [
    PackageComponent
  ],
  imports: [
    CommonModule,
    PackageRoutingModule,
    SharedModule
],
  providers: [PackageService]
})
export class PackageModule { }
