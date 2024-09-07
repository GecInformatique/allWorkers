import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'about',
        loadChildren: () =>
          import('./about-us/about-us.module').then((m) => m.AboutUsModule),
      },
      {
        path: 'blog',
        // canActivate: [BlogGuard],
        loadChildren: () =>
          import('./blog/blog.module').then((m) => m.BlogModule)
      },
      {
        path: 'user-account-details',
        loadChildren: () =>
          import('./userdetails/userdetails.module').then(
            (m) => m.UserdetailsModule
          ),
      },
      {
        path: 'term-condition',
        loadChildren: () =>
          import('./term-condition/term-condition.module').then(
            (m) => m.TermConditionModule
          ),
      },
      /*{
        path: 'otp',
        loadChildren: () => import('./otp/otp.module').then((m) => m.OtpModule),
      },*/
      {
        path: 'faq',
        loadChildren: () => import('./faq/faq.module').then((m) => m.FaqModule),
      },

      {
        path: 'candidat-list',
        loadChildren: () =>
          import('./candidat-list/candidat-list.module').then((m) => m.CandidatListModule),
      },
      {
        path: 'candidat-detail',
        loadChildren: () =>
          import('./candidat-detail/candidat-detail.module').then((m) => m.CandidatDetailModule),
      },
      {
        path: 'formation',
        loadChildren: () =>
          import('./formation/formation.module').then((m) => m.FormationModule),
      },
      {
        path: 'formation-detail',
        loadChildren: () =>
          import('./formation-detail/formation-detail.module').then((m) => m.FormationDetailModule),
      },
      {
        path: 'domain-list',
        loadChildren: () =>
          import('./domaine-list/domain-list.module').then((m) => m.DomainListModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
