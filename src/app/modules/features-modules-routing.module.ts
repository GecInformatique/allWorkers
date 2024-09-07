import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesModulesComponent } from './features-modules.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FeaturesModulesComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../modules/pages/home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'pages',
        // canActivate: [PageGuard],
        loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule)
      },
      { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
      { path: 'freelancer', loadChildren: () => import('./freelancer/freelancer.module').then(m => m.FreelancerModule) },
      { path: 'error', loadChildren: () => import('./errors/errors.module').then(m => m.ErrorsModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesModulesRoutingModule { }
