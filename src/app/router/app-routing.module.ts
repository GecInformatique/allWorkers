import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
const routerOptions: ExtraOptions = {
  useHash: true,
    anchorScrolling: 'enabled'
};


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../modules/features-modules.module').then( (m) => m.FeaturesModulesModule)
  },

  {
    path: '**',
    redirectTo: 'error/page-not-found',
    pathMatch: 'full',
  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
