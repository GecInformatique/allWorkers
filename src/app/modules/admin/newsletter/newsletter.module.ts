import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/layout/shared/shared.module';
import {NewsletterComponent} from "./newsletter.component";
import {NewsletterRoutingModule} from "./newsletter-routing.module";
import {NewsletterService} from "../../../core/libs/scripts/libs/all-workers-api";



@NgModule({
  declarations: [
    NewsletterComponent
  ],
  imports: [
    CommonModule,
    NewsletterRoutingModule,
    SharedModule
],
  providers: [NewsletterService]
})
export class NewsletterModule { }
