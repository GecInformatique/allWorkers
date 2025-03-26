import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CompanyProjectsComponent} from "./company-projects.component";

const routes: Routes = [{ path: '', component: CompanyProjectsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyProjectsRoutingModule { }
