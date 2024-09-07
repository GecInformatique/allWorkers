import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DomainListComponent} from "./domain-list.component";

const routes: Routes = [{ path: '', component: DomainListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomainListRoutingModule { }
