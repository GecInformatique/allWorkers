import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/layout/shared/shared.module';
import {DocumentsComponent} from "./documents.component";
import {DocumentsRoutingModule} from "./documents-routing.module";



@NgModule({
  declarations: [
    DocumentsComponent
  ],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    SharedModule
]
})
export class DocumentsModule { }
