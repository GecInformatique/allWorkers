import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileDetailComponent} from "./profileDetail.component";

const routes: Routes = [{ path: '', component: ProfileDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileDetailRoutingModule { }
