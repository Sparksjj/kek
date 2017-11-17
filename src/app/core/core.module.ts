import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavItemComponent } from './sidenav/sidenav-item/sidenav-item.component';
import { IconSidenavDirective } from './sidenav/icon-sidenav.directive';
import { SearchComponent } from './toolbar/search/search.component';
import { BreadcrumbsComponent } from './breadcrumb/breadcrumb.component';
import { AdminComponent } from './admin/admin.component';
import { QuickpanelComponent } from './quickpanel/quickpanel.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarUserButtonComponent } from './toolbar/toolbar-user-button/toolbar-user-button.component';
import { ClickOutsideDirective } from './utils/click-outside.directive';
import { SearchBarComponent } from './toolbar/search-bar/search-bar.component';
import { ToolbarNotificationsComponent } from './toolbar/toolbar-notifications/toolbar-notifications.component';
import { SidenavService } from './sidenav/sidenav.service';
import { MediaReplayService } from './sidenav/mediareplay/media-replay.service';
import { BreadcrumbService } from './breadcrumb/breadcrumb.service';
import { MaterialComponentsModule } from '../material-components.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ScrollbarModule } from './scrollbar/scrollbar.module';
import { ApplicationHttpClient } from './http-client';
import { TextMaskModule } from 'angular2-text-mask';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Parse422Component } from '../custom/parse422/parse422.component';
import { ForObjPipe } from './for-obj.pipe';
import { HomeComponent } from '../custom/home/home.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ScrollbarModule,
    TextMaskModule,
    HttpModule,
    HttpClientModule
  ],
  exports: [
    TextMaskModule,
    MaterialComponentsModule,
    HttpModule,
    FlexLayoutModule,
    Parse422Component
  ],
  declarations: [
    SidenavComponent,
    SidenavItemComponent,
    IconSidenavDirective,
    SearchComponent,
    BreadcrumbsComponent,
    AdminComponent,
    QuickpanelComponent,
    ToolbarComponent,
    ToolbarUserButtonComponent,
    ClickOutsideDirective,
    SearchBarComponent,
    ToolbarNotificationsComponent,
    Parse422Component,
    ForObjPipe,
    HomeComponent
  ],
  providers: [
    SidenavService,
    MediaReplayService,
    BreadcrumbService,
    Http,
    ApplicationHttpClient
  ]
})
export class CoreModule {}
