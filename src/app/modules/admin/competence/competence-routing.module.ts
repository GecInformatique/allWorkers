import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CompetenceComponent} from "./competence.component";

const routes: Routes = [{ path: '', component: CompetenceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetenceRoutingModule { }
