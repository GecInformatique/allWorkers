import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreelancerComponent } from './freelancer.component';

const routes: Routes = [
  {
    path: '',
    component: FreelancerComponent,
    children: [
      { path: '', redirectTo: 'dashboards', pathMatch: 'full' },
      {
        path: 'dashboards',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'developer-profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
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
        path: 'profile-settings',
        loadChildren: () =>
          import('./settings/profile-settings/profile-settings.module').then(
            (m) => m.ProfileSettingsModule
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
      //nouvelle modification

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
export class FreelancerRoutingModule {}
