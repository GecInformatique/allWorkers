import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {FeaturesModulesModule} from "../features-modules.module";
import {CompanyRoutingModule} from "./company-routing.module";
import {CompanyComponent} from "./company.component";
import {CompanyHeaderComponent} from "../../layout/companyHeader/companyHeader.component";
import {SidemenuCompanyComponent} from "./sidemenuCompany/sidemenuCompany.component";


@NgModule({
  declarations: [
    CompanyComponent,
    CompanyHeaderComponent,
    SidemenuCompanyComponent
  ],
    imports: [
        CommonModule,
        CompanyRoutingModule,
        FeaturesModulesModule
    ]
})
export class CompanyModule { }
