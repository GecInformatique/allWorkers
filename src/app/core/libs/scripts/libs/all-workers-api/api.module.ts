import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AdvertisementService } from './api/advertisement.service';
import { AuthService } from './api/auth.service';
import { CandidateService } from './api/candidate.service';
import { CompetenceService } from './api/competence.service';
import { ConditionService } from './api/condition.service';
import { DocumentService } from './api/document.service';
import { DomainActivityService } from './api/domainActivity.service';
import { EducationService } from './api/education.service';
import { FavoriteService } from './api/favorite.service';
import { FormationService } from './api/formation.service';
import { GroupService } from './api/group.service';
import { InvoiceService } from './api/invoice.service';
import { LogService } from './api/log.service';
import { MessageService } from './api/message.service';
import { NewsletterService } from './api/newsletter.service';
import { OauthProviderService } from './api/oauthProvider.service';
import { PackageService } from './api/package.service';
import { PaymentService } from './api/payment.service';
import { PermissionService } from './api/permission.service';
import { ProfessionService } from './api/profession.service';
import { ProjectService } from './api/project.service';
import { QuestionService } from './api/question.service';
import { ReviewService } from './api/review.service';
import { RoleService } from './api/role.service';
import { SpecialismService } from './api/specialism.service';
import { StatusService } from './api/status.service';
import { SubscriptionService } from './api/subscription.service';
import { TaskService } from './api/task.service';
import { TestimonialService } from './api/testimonial.service';
import { TypeDocumentService } from './api/typeDocument.service';
import { UserService } from './api/user.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AdvertisementService,
    AuthService,
    CandidateService,
    CompetenceService,
    ConditionService,
    DocumentService,
    DomainActivityService,
    EducationService,
    FavoriteService,
    FormationService,
    GroupService,
    InvoiceService,
    LogService,
    MessageService,
    NewsletterService,
    OauthProviderService,
    PackageService,
    PaymentService,
    PermissionService,
    ProfessionService,
    ProjectService,
    QuestionService,
    ReviewService,
    RoleService,
    SpecialismService,
    StatusService,
    SubscriptionService,
    TaskService,
    TestimonialService,
    TypeDocumentService,
    UserService ]
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
