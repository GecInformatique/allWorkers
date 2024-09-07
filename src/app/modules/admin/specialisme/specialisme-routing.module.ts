import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SpecialismeComponent} from "./specialisme.component";

const routes: Routes = [{ path: '', component: SpecialismeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialismeRoutingModule { }
