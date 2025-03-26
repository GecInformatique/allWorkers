import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CompanyComponent} from "./company.component";

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    children: [
      { path: '', redirectTo: 'dashboards', pathMatch: 'full' },
      {
        path: 'company_dashboards',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
     {
        path: 'company-detail',
        loadChildren: () =>
          import('./companyDetail/profileDetail.module').then((m) => m.ProfileDetailModule),
      },


      {
        path: 'reviews',
        loadChildren: () =>
          import('./review/review.module').then((m) => m.ReviewModule),
      },



      {
        path: 'statement',
        loadChildren: () =>
          import('./statement/statement.module').then((m) => m.StatementModule),
      },


      {
        path: 'company_profile',
        loadChildren: () =>
          import('./settings/profileCompany/profileCompany.module').then(
            (m) => m.ProfileCompanyModule
          ),
      },
      {
        path: 'company-projects',
        loadChildren: () =>
          import('./project/company-projects/company-projects.module').then(
            (m) => m.CompanyProjectsModule
          ),
      },

      {
        path: 'verified',
        loadChildren: () =>
          import('./settings/verified/verified.module').then(
            (m) => m.VerifiedModule
          ),
      },
      {
        path: 'verify-identity',
        loadChildren: () =>
          import('./settings/verify-identity/verify-identity.module').then(
            (m) => m.VerifyIdentityModule
          ),
      },

      {
        path: 'delete-account',
        loadChildren: () =>
          import('./settings/delete-account/delete-account.module').then(
            (m) => m.DeleteAccountModule
          ),
      },

      {
        path: 'change-password',
        loadChildren: () =>
          import('./settings/change-password/change-password.module').then(
            (m) => m.ChangePasswordModule
          ),
      },


      {
        path: 'view-freelancer-detail',
        loadChildren: () =>
          import(
            './view-freelancer-detail/view-freelancer-detail.module'
            ).then((m) => m.ViewFreelancerDetailModule),
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
