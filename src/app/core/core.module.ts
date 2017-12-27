import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  HttpInterceptor
} from '@angular/common/http';
import { Http, HttpModule } from '@angular/http';
import { NguiDatetime, NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { TinyMceModule, tinymceDefaultSettings } from 'angular-tinymce';

import { AdminComponent } from './admin/admin.component';
import { AppMemoryService } from './app-memory.service';
import { AppService } from '../custom/app/app.service';
import { ApplicationHttpClient } from './http-client';
import { BreadcrumbService } from './breadcrumb/breadcrumb.service';
import { BreadcrumbsComponent } from './breadcrumb/breadcrumb.component';
import { ClickOutsideDirective } from './utils/click-outside.directive';
import { CommonModule } from '@angular/common';
import { CreateAppComponent } from '../custom/app/create-app/create-app.component';
import { CreateFaqComponent } from '../custom/faq/create-faq/create-faq.component';
import { CreateMediaComponent } from '../custom/media/create-media/create-media.component';
import { CreateNewsComponent } from '../custom/news/create-news/create-news.component';
import { CreatePartnersComponent } from '../custom/partners/create-partners/create-partners.component';
import { CreateRoadmapComponent } from '../custom/roadmap/create-roadmap/create-roadmap.component';
import { CreateTeam2Component } from '../custom/team2/create-team/create-team.component';
import { CreateTeamComponent } from '../custom/team/create-team/create-team.component';
import { CreateTemplateComponent } from '../custom/template/create-template/create-template.component';
import { CustomQuillDirective } from './custom-quill.directive';
import { EmailService } from './../custom/email/email.service';
import { FaqService } from '../custom/faq/faq.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ForObjPipe } from './for-obj.pipe';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from '../custom/home/home.component';
import { IconSidenavDirective } from './sidenav/icon-sidenav.directive';
import { IndexAppComponent } from '../custom/app/index-app/index-app.component';
import { IndexEmailComponent } from './../custom/email/index-email/index-email.component';
import { IndexFaqComponent } from '../custom/faq/index-faq/index-faq.component';
import { IndexMediaComponent } from '../custom/media/index-media/index-media.component';
import { IndexNewsComponent } from '../custom/news/index-news/index-news.component';
import { IndexPartnersComponent } from '../custom/partners/index-partners/index-partners.component';
import { IndexRoadmapComponent } from '../custom/roadmap/index-roadmap/index-roadmap.component';
import { IndexTeam2Component } from '../custom/team2/index-team/index-team.component';
import { IndexTeamComponent } from '../custom/team/index-team/index-team.component';
import { IndexTemplateComponent } from '../custom/template/index-template/index-template.component';
import { IndexUsersComponent } from '../custom/users/index-users/index-users.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { MaterialComponentsModule } from '../material-components.module';
import { MediaReplayService } from './sidenav/mediareplay/media-replay.service';
import { MediaService } from '../custom/media/media.service';
import { NewsService } from '../custom/news/news.service';
import { NgModule } from '@angular/core';
import { PaginationComponent } from './pagination/pagination.component';
import { PaginationService } from './pagination/pagination.service';
import { Parse422Component } from '../custom/parse422/parse422.component';
import { PartnersService } from '../custom/partners/partners.service';
import { QuickpanelComponent } from './quickpanel/quickpanel.component';
import { QuillModule } from 'ngx-quill';
import { RoadmapService } from '../custom/roadmap/roadmap.service';
import { RouterModule } from '@angular/router';
import { ScrollbarModule } from './scrollbar/scrollbar.module';
import { SearchBarComponent } from './toolbar/search-bar/search-bar.component';
import { SearchComponent } from './toolbar/search/search.component';
import { ServerLocationInterceptor } from './../auth/auth-http.service';
import { ShowAppComponent } from '../custom/app/show-app/show-app.component';
import { ShowFaqComponent } from '../custom/faq/show-faq/show-faq.component';
import { ShowMediaComponent } from '../custom/media/show-media/show-media.component';
import { ShowNewsComponent } from '../custom/news/show-news/show-news.component';
import { ShowPartnersComponent } from '../custom/partners/show-partners/show-partners.component';
import { ShowRoadmapComponent } from '../custom/roadmap/show-roadmap/show-roadmap.component';
import { ShowTeam2Component } from '../custom/team2/show-team/show-team.component';
import { ShowTeamComponent } from '../custom/team/show-team/show-team.component';
import { ShowTemplateComponent } from '../custom/template/show-template/show-template.component';
import { ShowUsersComponent } from '../custom/users/show-users/show-users.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavItemComponent } from './sidenav/sidenav-item/sidenav-item.component';
import { SidenavService } from './sidenav/sidenav.service';
import { SocketService } from './socket.service';
import { SortablejsModule } from 'angular-sortablejs';
import { Team2Service } from '../custom/team2/team.service';
import { TeamService } from '../custom/team/team.service';
import { TemplateService } from '../custom/template/template.service';
import { TextMaskModule } from 'angular2-text-mask';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarNotificationsComponent } from './toolbar/toolbar-notifications/toolbar-notifications.component';
import { ToolbarUserButtonComponent } from './toolbar/toolbar-user-button/toolbar-user-button.component';
import { UnloadingService } from './unloading.service';
import { UsersService } from '../custom/users/users.service';

NguiDatetime.daysOfWeek = [
  { fullName: 'Воскресенье', shortName: 'Вс' },
  { fullName: 'Понедельник', shortName: 'Пн' },
  { fullName: 'Вторник', shortName: 'Вт' },
  { fullName: 'Среда', shortName: 'Ср' },
  { fullName: 'Четверг', shortName: 'Чт' },
  { fullName: 'Пятница', shortName: 'Пт' },
  { fullName: 'Суббота', shortName: 'Сб' }
];
NguiDatetime.months = [
  { fullName: 'Январь', shortName: 'Янв' },
  { fullName: 'Февраль', shortName: 'Фев' },
  { fullName: 'Март', shortName: 'Мар' },
  { fullName: 'Апрель', shortName: 'Апр' },
  { fullName: 'Май', shortName: 'Май' },
  { fullName: 'Июнь', shortName: 'Июн' },
  { fullName: 'Июль', shortName: 'Июл' },
  { fullName: 'Август', shortName: 'Авг' },
  { fullName: 'Сентябрь', shortName: 'Сен' },
  { fullName: 'Октябрь', shortName: 'Окт' },
  { fullName: 'Ноябрь', shortName: 'Ноя' },
  { fullName: 'Декабрь', shortName: 'Дек' }
];
NguiDatetime.locale = {
  date: 'дата',
  time: 'время',
  year: 'год',
  month: 'месяц',
  day: 'день',
  hour: 'часы',
  minute: 'мин.',
  currentTime: 'текущее время'
};

NguiDatetime.firstDayOfWeek = 1;

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
    NguiDatetimePickerModule,
    SortablejsModule,
    TinyMceModule.forRoot({
      menubar: 'false',
      theme: 'modern',
      height: 500,
      plugins:
        'code autolink visualblocks visualchars fullscreen image link media template charmap hr pagebreak nonbreaking anchor toc advlist lists textcolor wordcount colorpicker textpattern help',
      toolbar:
        'formatselect | bold italic strikethrough forecolor backcolor | image link | alignleft aligncenter alignright alignjustify  | numlist bullist  | removeformat | code',
      tinymceScriptURL: 'assets/tinymce/tinymce.min.js',
      relative_url: true,
      skin_url: '/assets/tinymce/skins/lightgray',
      theme_url: '/assets/tinymce/themes/modern/theme.min.js',
      branding: false
    })
  ],
  exports: [
    MaterialComponentsModule,
    HttpModule,
    FlexLayoutModule,
    Parse422Component,
    TinyMceModule
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
    IndexTeam2Component,
    ShowTeam2Component,
    CreateTeam2Component,
    IndexNewsComponent,
    ShowNewsComponent,
    CreateNewsComponent,
    IndexFaqComponent,
    ShowFaqComponent,
    CreateFaqComponent,
    CreateRoadmapComponent,
    ShowRoadmapComponent,
    IndexRoadmapComponent,
    CustomQuillDirective,
    IndexEmailComponent,
    CreateTemplateComponent,
    ShowTemplateComponent,
    IndexTemplateComponent,
    IndexUsersComponent,
    ShowUsersComponent,
    CreatePartnersComponent,
    IndexPartnersComponent,
    ShowPartnersComponent,
    IndexMediaComponent,
    CreateMediaComponent,
    ShowMediaComponent
  ],
  providers: [
    SidenavService,
    PaginationService,
    AppService,
    MediaReplayService,
    BreadcrumbService,
    ApplicationHttpClient,
    AppMemoryService,
    TeamService,
    Team2Service,
    NewsService,
    EmailService,
    UnloadingService,
    SocketService,
    RoadmapService,
    TemplateService,
    UsersService,
    MediaService,
    PartnersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerLocationInterceptor,
      multi: true
    },
    FaqService
  ]
})
export class CoreModule {}
