import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DomainListRoutingModule } from './domain-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {DomainListComponent} from "./domain-list.component";


@NgModule({
  declarations: [
    DomainListComponent
  ],
  imports: [
    CommonModule,
    DomainListRoutingModule,
    SharedModule
  ]
})
export class DomainListModule { }
