import { AppMemoryService } from './app-memory.service';
import { PaginationComponent } from './pagination/pagination.component';
import { PaginationService } from './pagination/pagination.service';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
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
import { IndexAppComponent } from '../custom/app/index-app/index-app.component';
import { LoadingComponent } from './loading/loading.component';
import { AppService } from '../custom/app/app.service';
import { ShowAppComponent } from '../custom/app/show-app/show-app.component';
import { CreateAppComponent } from '../custom/app/create-app/create-app.component';
import { IndexTeamComponent } from '../custom/team/index-team/index-team.component';
import { ShowTeamComponent } from '../custom/team/show-team/show-team.component';
import { CreateTeamComponent } from '../custom/team/create-team/create-team.component';
import { IndexNewsComponent } from '../custom/news/index-news/index-news.component';
import { ShowNewsComponent } from '../custom/news/show-news/show-news.component';
import { CreateNewsComponent } from '../custom/news/create-news/create-news.component';
import { TeamService } from '../custom/team/team.service';
import { NewsService } from '../custom/news/news.service';
import { QuillModule } from 'ngx-quill';
import { IndexFaqComponent } from '../custom/faq/index-faq/index-faq.component';
import { ShowFaqComponent } from '../custom/faq/show-faq/show-faq.component';
import { CreateFaqComponent } from '../custom/faq/create-faq/create-faq.component';
import { CreateRoadmapComponent } from '../custom/roadmap/create-roadmap/create-roadmap.component';
import { ShowRoadmapComponent } from '../custom/roadmap/show-roadmap/show-roadmap.component';
import { IndexRoadmapComponent } from '../custom/roadmap/index-roadmap/index-roadmap.component';
import { RoadmapService } from '../custom/roadmap/roadmap.service';
import { FaqService } from '../custom/faq/faq.service';
import { SortablejsModule } from 'angular-sortablejs';
import { CustomQuillDirective } from './custom-quill.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ScrollbarModule,
    HttpModule,
    HttpClientModule,
    QuillModule,
    SortablejsModule
  ],
  exports: [
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
    HomeComponent,
    IndexAppComponent,
    LoadingComponent,
    LoadingOverlayComponent,
    PaginationComponent,
    ShowAppComponent,
    CreateAppComponent,
    IndexTeamComponent,
    ShowTeamComponent,
    CreateTeamComponent,
    IndexNewsComponent,
    ShowNewsComponent,
    CreateNewsComponent,
    IndexFaqComponent,
    ShowFaqComponent,
    CreateFaqComponent,
    CreateRoadmapComponent,
    ShowRoadmapComponent,
    IndexRoadmapComponent,
    CustomQuillDirective
  ],
  providers: [
    SidenavService,
    PaginationService,
    AppService,
    MediaReplayService,
    BreadcrumbService,
    Http,
    ApplicationHttpClient,
    AppMemoryService,
    TeamService,
    NewsService,
    RoadmapService,
    FaqService
  ]
})
export class CoreModule {}
