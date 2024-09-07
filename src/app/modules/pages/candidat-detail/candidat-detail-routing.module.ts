import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CandidatDetailComponent} from "./candidat-detail.component";

const routes: Routes = [{ path: '', component: CandidatDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatDetailRoutingModule { }
