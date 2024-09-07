import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'page-not-found', component: NotfoundComponent },
    ])],
    exports: [RouterModule]
})
export class ErrorsRoutingModule {}
