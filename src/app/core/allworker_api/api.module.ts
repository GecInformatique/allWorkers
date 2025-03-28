import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AuthService } from './api/auth.service';
import { CandidatsService } from './api/candidats.service';
import { EducationsService } from './api/educations.service';
import { EntreprisesService } from './api/entreprises.service';
import { ExperiencesService } from './api/experiences.service';
import { ProjetsService } from './api/projets.service';
import { TachesService } from './api/taches.service';
import { UsersService } from './api/users.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AuthService,
    CandidatsService,
    EducationsService,
    EntreprisesService,
    ExperiencesService,
    ProjetsService,
    TachesService,
    UsersService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<any> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
