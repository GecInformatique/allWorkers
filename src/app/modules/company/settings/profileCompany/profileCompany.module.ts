import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from 'src/app/shared/shared.module';
import {ProfileCompanyComponent} from "./profileCompany.component";
import {ProfileCompanyRoutingModule} from "./profileCompany-routing.module";
import {DropdownModule} from "primeng/dropdown";


@NgModule({
  declarations: [
    ProfileCompanyComponent
  ],
    imports: [
        CommonModule,
        ProfileCompanyRoutingModule,
        SharedModule,
        DropdownModule
    ]
})
export class ProfileCompanyModule { }
