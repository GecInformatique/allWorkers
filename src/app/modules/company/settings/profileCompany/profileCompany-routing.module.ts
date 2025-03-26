import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileCompanyComponent} from "./profileCompany.component";

const routes: Routes = [{ path: '', component: ProfileCompanyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileCompanyRoutingModule { }
