import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormationsComponent} from "./formations.component";

const routes: Routes = [{ path: '', component: FormationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationsRoutingModule { }
