import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      // { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'competences',
        loadChildren: () =>
          import('./competence/competence.module').then(
            (m) => m.CompetenceModule
           ),
      },
      {
        path: 'conditions',
        loadChildren: () =>
          import('./condition/condition.module').then((m) => m.ConditionModule),
      },
      {
        path: 'professions',
        loadChildren: () =>
          import('./profession/profession.module').then((m) => m.ProfessionModule),
      },
      {
        path: 'advertisements',
        loadChildren: () =>
          import('./advertisement/advertisement.module').then((m) => m.AdvertisementModule),
      },
      {
        path: 'domains',
        loadChildren: () =>
          import('./domains/domains.module').then((m) => m.DomainsModule),
      },
      {
        path: 'candidats',
        loadChildren: () =>
          import('./candidats/candidats.module').then((m) => m.CandidatsModule),
      },
      {
        path: 'educations',
        loadChildren: () =>
          import('./educations/educations.module').then((m) => m.EducationsModule),
      },
       {
          path: 'formations',
         loadChildren: () =>
           import('./formations/formations.module').then(
             (m) => m.FormationsModule
           ),
       },
       {
         path: 'newsletters',
         loadChildren: () =>
           import('./newsletter/newsletter.module').then((m) => m.NewsletterModule),
       },
       {
         path: 'projects',
         loadChildren: () =>
           import('./projets/projets.module').then((m) => m.ProjetsModule),
       },
       {
         path: 'paiements',
         loadChildren: () =>
           import('./payment/payment.module').then((m) => m.PaymentModule),
       },
       {
         path: 'questions',
         loadChildren: () =>
           import('./questions/questions.module').then(
             (m) => m.QuestionsModule
           ),
       },
       {
         path: 'packages',
         loadChildren: () =>
           import('./package/package.module').then((m) => m.PackageModule),
       },
       {
         path: 'subscription',
         loadChildren: () =>
           import('./subscription/subscription.module').then(
             (m) => m.SubscriptionModule
           ),
       },
      {
        path: 'specialisms',
        loadChildren: () =>
          import('./specialisme/specialisme.module').then(
            (m) => m.SpecialismeModule
          ),
      },
      // {
      //   path: 'reports',
      //   loadChildren: () =>
      //     import('./reports/reports.module').then((m) => m.ReportsModule),
      // },
      {
        path: 'roles',
        loadChildren: () =>
          import('./roles/roles.module').then((m) => m.RolesModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      // {
      //   path: 'skills',
      //   loadChildren: () =>
      //     import('./skills/skills.module').then((m) => m.SkillsModule),
      // },
      // {
      //   path: 'verifyidentity',
      //   loadChildren: () =>
      //     import('./verifyidentity/verifyidentity.module').then(
      //       (m) => m.VerifyidentityModule
      //     ),
      // },
      // {
      //   path: 'settings',
      //   loadChildren: () =>
      //     import('./settings/settings.module').then((m) => m.SettingsModule),
      // },
      // {
      //   path: 'components',
      //   loadChildren: () =>
      //     import('./compnents/compnents.module').then((m) => m.CompnentsModule),
      // },
      // {
      //   path: 'forms',
      //   loadChildren: () =>
      //     import('./forms/forms.module').then((m) => m.FormsModule),
      // },
      // {
      //   path: 'tables',
      //   loadChildren: () =>
      //     import('./tables/tables.module').then((m) => m.TablesModule),
      // },
      // {
      //   path: 'role-permission',
      //   loadChildren: () =>
      //     import('./role/role-permission/role-permission.module').then(
      //       (m) => m.RolePermissionModule
      //     ),
      // },
      // {
      //   path: 'profile',
      //   loadChildren: () =>
      //     import('./profile/profile.module').then((m) => m.ProfileModule),
      // },
      // {
      //   path: 'views',
      //   loadChildren: () =>
      //     import('./views/views.module').then((m) => m.ViewsModule),
      // },
      // {
      //   path: 'user-transactions',
      //   loadChildren: () =>
      //     import(
      //       './user-profiles/user-transactions/user-transactions.module'
      //     ).then((m) => m.UserTransactionsModule),
      // },
      // {
      //   path: 'activities',
      //   loadChildren: () =>
      //     import('./user-profiles/activities/activities.module').then(
      //       (m) => m.ActivitiesModule
      //     ),
      // },
      // {
      //   path: 'user-profile',
      //   loadChildren: () =>
      //     import('./user-profiles/user-profile/user-profile.module').then(
      //       (m) => m.UserProfileModule
      //     ),
      // },
      // {
      //   path: 'auth',
      //   loadChildren: () =>
      //     import('./auth/auth.module').then((m) => m.AuthModule),
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
