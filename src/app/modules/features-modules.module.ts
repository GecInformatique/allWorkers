import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesModulesRoutingModule } from './features-modules-routing.module';
import { FeaturesModulesComponent } from './features-modules.component';
import {HeaderComponent} from "../layout/header/header.component";
import {FooterComponent} from "../layout/footer/footer.component";
import {LoaderComponent} from "../layout/loader/loader.component";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
    declarations: [
        FeaturesModulesComponent,
        HeaderComponent,
        FooterComponent,
        LoaderComponent,
    ],
    imports: [
        CommonModule,
        FeaturesModulesRoutingModule,
        TranslateModule,
    ],

    exports: [
        HeaderComponent
    ]
})
export class FeaturesModulesModule { }
