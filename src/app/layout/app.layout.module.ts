import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { AppConfigModule } from './config/others.config.module';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { AppLayoutComponent } from './others-layout/others.layout.component';
import { AppBreadcrumbComponent } from './breadcrumb/others.breadcrumb.component';
import { AppSidebarComponent } from './sidebar/others.sidebar.component';
import { AppFooterComponent } from './footer/others.topbar.component';
import { AppProfileSidebarComponent } from './profile-menu/others.profilesidebar.component';
import { AppMenuComponent } from './item-menu/others.menu.component';
import { AppMenuitemComponent } from './item-menu/others.menuitem.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [AppLayoutComponent, AppBreadcrumbComponent, AppSidebarComponent, AppFooterComponent, AppProfileSidebarComponent, AppMenuComponent, AppMenuitemComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StyleClassModule,
    InputTextModule,
    SidebarModule,
    BadgeModule,
    ToastModule,
    RadioButtonModule,
    InputSwitchModule,
    TooltipModule,
    RippleModule,
    RouterModule,
    AppConfigModule,
    ButtonModule
  ]
})
export class AppLayoutModule {}
