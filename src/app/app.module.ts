import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {CommonModule, DatePipe} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {LocalAuthService} from "./core/data/local/local.auth.service";
import {LocalTokenService} from "./core/data/local/local.token.service";
import {NonAuthGuardService} from "./router/guard/non-auth.guard";
import {AuthGuardService} from "./router/guard/auth-guard.service";
import {AuthInterceptor} from "./core/data/network/config/auth-interceptor";
import {AppRoutingModule} from "./router/app-routing.module";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { DomainActivityService } from './core/libs/scripts/libs/all-workers-api/api/domainActivity.service';
import {

  CandidateService,
  CompetenceService,
  ProfessionService,
  SpecialismService,
  TestimonialService
} from "./core/libs/scripts/libs/all-workers-api";
import {SharedModule} from "./layout/shared/shared.module";
import {MessageService} from "primeng/api";
import {AuthService, CandidatsService, EducationsService, EntreprisesService} from "./core/allworker_api";

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    LocalAuthService,
    LocalTokenService,
    AuthGuardService,
    NonAuthGuardService,
    DomainActivityService,
    CandidateService,
    CompetenceService,
    SpecialismService,
    ProfessionService,
    TestimonialService,
   // AuthService,
    DatePipe,
    MessageService,
    AuthService,
    EducationsService,
    EntreprisesService,
    CandidatsService,

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
   // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
