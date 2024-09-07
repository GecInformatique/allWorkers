import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DomainsRoutingModule} from './domains-routing.module';
import { SharedModule } from 'src/app/layout/shared/shared.module';
import { DomainsComponent } from './domains.component';



@NgModule({
  declarations: [
    DomainsComponent
  ],
  imports: [
    CommonModule,
    DomainsRoutingModule,
    SharedModule
]
})
export class DomainsModule { }
