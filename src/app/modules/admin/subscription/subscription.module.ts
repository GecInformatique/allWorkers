import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/layout/shared/shared.module';
import {SubscriptionComponent} from "./subscription.component";
import {SubscriptionRoutingModule} from "./subscription-routing.module";



@NgModule({
  declarations: [
    SubscriptionComponent
  ],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    SharedModule
]
})
export class SubscriptionModule { }
