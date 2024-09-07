import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CandidatsComponent} from "./candidats.component";

const routes: Routes = [{ path: '', component: CandidatsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatsRoutingModule { }
