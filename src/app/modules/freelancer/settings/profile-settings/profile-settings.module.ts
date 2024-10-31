import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProfileSettingsRoutingModule } from './profile-settings-routing.module';
import { ProfileSettingsComponent } from './profile-settings.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {TabViewModule} from "primeng/tabview";


@NgModule({
  declarations: [
    ProfileSettingsComponent
  ],
  imports: [
    CommonModule,
    TabViewModule,
    ProfileSettingsRoutingModule,
    SharedModule
  ],
  providers: [
    DatePipe,
  ]
})
export class ProfileSettingsModule { }
