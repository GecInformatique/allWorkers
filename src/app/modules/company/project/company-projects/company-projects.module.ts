import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CompanyProjectsRoutingModule} from "./company-projects-routing.module";
import {CompanyProjectsComponent} from "./company-projects.component";
import {NgxEditorModule} from "ngx-editor";
import {SharedModule} from "../../../../shared/shared.module";
import {DropdownModule} from "primeng/dropdown";



@NgModule({
  declarations: [
    CompanyProjectsComponent
  ],
  imports: [
    CommonModule,
    CompanyProjectsRoutingModule,
    NgxEditorModule,
    SharedModule,
    DropdownModule
  ]
})
export class CompanyProjectsModule { }
