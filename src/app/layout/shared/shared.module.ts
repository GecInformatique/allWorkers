import {HttpClient, HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';

import { MatTableModule } from '@angular/material/table';

import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgChartsModule } from 'ng2-charts';
import { LightboxModule } from 'ngx-lightbox';
import { CountUpModule } from 'ngx-countup';
import { NgxEditorModule } from 'ngx-editor';
import {
  BsDatepickerModule,
  BsDatepickerConfig,
} from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LightgalleryModule } from 'lightgallery/angular';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TranslateModule} from "@ngx-translate/core";
import {MaterialModule} from "./material.module";
import {InputMaskModule} from "primeng/inputmask";
import {AutoCompleteModule} from "primeng/autocomplete";
import {TreeSelectModule} from "primeng/treeselect";
import {DropdownModule} from "primeng/dropdown";
import {RatingComponent} from "../component/app-rating/app-rating.component";
import {PaginationComponent} from "../component/app-pagination/app-pagination.component";
import {PasswordModule} from "primeng/password";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";



@NgModule({

  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MaterialModule,
    NgApexchartsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSliderModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatStepperModule,
    MatProgressBarModule,
    ClipboardModule,
    DragDropModule,
    MatCheckboxModule,
    ScrollingModule,
    MatIconModule,
    PopoverModule.forRoot(),
    MatTooltipModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    NgScrollbarModule,
    NgChartsModule,
    LightboxModule,
    MatSelectModule,
    CountUpModule,
    NgxEditorModule,
    BsDatepickerModule.forRoot(),
    CarouselModule,
    LightgalleryModule,
    TimepickerModule.forRoot(),
    TranslateModule,
    AutoCompleteModule,
    TreeSelectModule,
    InputMaskModule,

  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MaterialModule,
    NgApexchartsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSliderModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatStepperModule,
    MatProgressBarModule,
    ClipboardModule,
    DragDropModule,
    MatCheckboxModule,
    ScrollingModule,
    MatIconModule,
    PopoverModule,
    ModalModule,
    MatTooltipModule,
    ToastrModule,
    NgScrollbarModule,
    NgChartsModule,
    LightboxModule,
    MatSelectModule,
    CountUpModule,
    NgxEditorModule,
    BsDatepickerModule,
    CarouselModule,
    LightgalleryModule,
    TimepickerModule,
    TranslateModule,
    AutoCompleteModule,
    InputMaskModule,
    TreeSelectModule,
    DropdownModule,
    RatingComponent,
    PaginationComponent,
    PasswordModule,
    ToastModule,
    DialogModule, ButtonModule, InputTextModule

  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
    BsDatepickerConfig
  ],
  declarations: [
  RatingComponent,
  PaginationComponent
]
})
export class SharedModule {}
