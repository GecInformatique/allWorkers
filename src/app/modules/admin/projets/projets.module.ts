import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/layout/shared/shared.module';
import {ProjetsComponent} from "./projets.component";
import {ProjetsRoutingModule} from "./projets-routing.module";



@NgModule({
  declarations: [
    ProjetsComponent
  ],
  imports: [
    CommonModule,
    ProjetsRoutingModule,
    SharedModule
]
})
export class ProjetsModule { }
