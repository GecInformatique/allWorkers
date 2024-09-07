import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/layout/shared/shared.module';
import {PaymentComponent} from "./payment.component";
import {PaymentRoutingModule} from "./payment-routing.module";
import { PaymentService} from "../../../core/libs/scripts/libs/all-workers-api";



@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule
],
  providers: [PaymentService]
})
export class PaymentModule { }
