import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProfileSettingsRoutingModule } from './profile-settings-routing.module';
import { ProfileSettingsComponent } from './profile-settings.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {TabViewModule} from "primeng/tabview";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {CalendarModule} from "primeng/calendar";


@NgModule({
  declarations: [
    ProfileSettingsComponent
  ],
  imports: [
    CommonModule,
    TabViewModule,
    ProfileSettingsRoutingModule,
    SharedModule,
    ButtonModule,
    DialogModule,
    CalendarModule
  ],
  providers: [
    DatePipe,
  ]
})
export class ProfileSettingsModule { }
