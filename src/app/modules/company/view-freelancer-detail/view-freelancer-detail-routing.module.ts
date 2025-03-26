import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewFreelancerDetailComponent } from './view-freelancer-detail.component';

const routes: Routes = [{ path: '', component: ViewFreelancerDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewFreelancerDetailRoutingModule { }
