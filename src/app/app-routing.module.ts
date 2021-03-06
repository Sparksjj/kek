import { ShowAdminComponent } from './custom/administrator/show-admin/show-admin.component';
import { IndexAdminComponent } from './custom/administrator/index-admin/index-admin.component';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './core/admin/admin.component';
import { AuthGuard } from './auth/auth-guard.service';
import { CreateAppComponent } from './custom/app/create-app/create-app.component';
import { CreateDocComponent } from './custom/documentation/create-doc/create-doc.component';
import { CreateFaqComponent } from './custom/faq/create-faq/create-faq.component';
import { CreateMediaComponent } from './custom/media/create-media/create-media.component';
import { CreateNewsComponent } from './custom/news/create-news/create-news.component';
import { CreatePartnersComponent } from './custom/partners/create-partners/create-partners.component';
import { CreateRoadmapComponent } from './custom/roadmap/create-roadmap/create-roadmap.component';
import { CreateRoadshowComponent } from './custom/roadshow/create-roadshow/create-roadshow.component';
import { CreateTeam2Component } from './custom/team2/create-team/create-team.component';
import { CreateTeamComponent } from './custom/team/create-team/create-team.component';
import { CreateTemplateComponent } from './custom/template/create-template/create-template.component';
import { HomeComponent } from './custom/home/home.component';
import { IndexAppComponent } from './custom/app/index-app/index-app.component';
import { IndexDictionaryComponent } from './custom/dictionary/index-dictionary.component';
import { IndexDocComponent } from './custom/documentation/index-doc/index-doc.component';
import { IndexEmailComponent } from './custom/email/index-email/index-email.component';
import { IndexFaqComponent } from './custom/faq/index-faq/index-faq.component';
import { IndexMediaComponent } from './custom/media/index-media/index-media.component';
import { IndexNewsComponent } from './custom/news/index-news/index-news.component';
import { IndexPartnersComponent } from './custom/partners/index-partners/index-partners.component';
import { IndexRoadmapComponent } from './custom/roadmap/index-roadmap/index-roadmap.component';
import { IndexRoadshowComponent } from './custom/roadshow/index-roadshow/index-roadshow.component';
import { IndexTeam2Component } from './custom/team2/index-team/index-team.component';
import { IndexTeamComponent } from './custom/team/index-team/index-team.component';
import { IndexTemplateComponent } from './custom/template/index-template/index-template.component';
import { IndexUsersComponent } from './custom/users/index-users/index-users.component';
import { NgModule } from '@angular/core';
import { PushComponent } from './custom/push/push.component';
import { ShowAppComponent } from './custom/app/show-app/show-app.component';
import { ShowDocComponent } from './custom/documentation/show-doc/show-doc.component';
import { ShowFaqComponent } from './custom/faq/show-faq/show-faq.component';
import { ShowMediaComponent } from './custom/media/show-media/show-media.component';
import { ShowNewsComponent } from './custom/news/show-news/show-news.component';
import { ShowPartnersComponent } from './custom/partners/show-partners/show-partners.component';
import { ShowRoadmapComponent } from './custom/roadmap/show-roadmap/show-roadmap.component';
import { ShowRoadshowComponent } from './custom/roadshow/show-roadshow/show-roadshow.component';
import { ShowTeam2Component } from './custom/team2/show-team/show-team.component';
import { ShowTeamComponent } from './custom/team/show-team/show-team.component';
import { ShowTemplateComponent } from './custom/template/show-template/show-template.component';
import { ShowUsersComponent } from './custom/users/show-users/show-users.component';
import { TransactionComponent } from './custom/transaction/transaction.component';
import { CreateAdminComponent } from './custom/administrator/create-admin/create-admin.component';
import { IndexVideosComponent } from './custom/videos/index-videos/index-videos.component';
import { ShowVideosComponent } from './custom/videos/show-videos/show-videos.component';
import { CreateVideosComponent } from './custom/videos/create-videos/create-videos.component';
import { ReferralComponent } from './custom/referral/referral.component';
import { IndexExchangesComponent } from './custom/exchanges/index-exchanges/index-exchanges.component';
import { ShowExchangesComponent } from './custom/exchanges/show-exchanges/show-exchanges.component';
import { CreateExchangesComponent } from './custom/exchanges/create-exchanges/create-exchanges.component';

const routes: Routes = [
  /*   {
    path: 'login',
    component: LoginComponent
  }, */
  /*
  {
    path: 'register',
    component: RegisterComponent
  }, */
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'app',
        component: IndexAppComponent,
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full',
      },
      {
        path: 'newApp',
        component: CreateAppComponent,
        pathMatch: 'full',
      },
      {
        path: 'app/:id',
        component: ShowAppComponent,
        pathMatch: 'full',
      },
      {
        path: 'team',
        component: IndexTeamComponent,
        pathMatch: 'full',
      },
      {
        path: 'newTeam',
        component: CreateTeamComponent,
        pathMatch: 'full',
      },
      {
        path: 'team/:id',
        component: ShowTeamComponent,
        pathMatch: 'full',
      },
      {
        path: 'team2',
        component: IndexTeam2Component,
        pathMatch: 'full',
      },
      {
        path: 'newTeam2',
        component: CreateTeam2Component,
        pathMatch: 'full',
      },
      {
        path: 'team2/:id',
        component: ShowTeam2Component,
        pathMatch: 'full',
      },
      {
        path: 'partners',
        component: IndexPartnersComponent,
        pathMatch: 'full',
      },
      {
        path: 'newPartner',
        component: CreatePartnersComponent,
        pathMatch: 'full',
      },
      {
        path: 'partners/:id',
        component: ShowPartnersComponent,
        pathMatch: 'full',
      },
      {
        path: 'media',
        component: IndexMediaComponent,
        pathMatch: 'full',
      },
      {
        path: 'newMedia',
        component: CreateMediaComponent,
        pathMatch: 'full',
      },
      {
        path: 'media/:id',
        component: ShowMediaComponent,
        pathMatch: 'full',
      },
      {
        path: 'roadshow',
        component: IndexRoadshowComponent,
        pathMatch: 'full',
      },
      {
        path: 'newRoadshow',
        component: CreateRoadshowComponent,
        pathMatch: 'full',
      },
      {
        path: 'roadshow/:id',
        component: ShowRoadshowComponent,
        pathMatch: 'full',
      },
      {
        path: 'news',
        component: IndexNewsComponent,
        pathMatch: 'full',
      },
      {
        path: 'newNews',
        component: CreateNewsComponent,
        pathMatch: 'full',
      },
      {
        path: 'news/:id',
        component: ShowNewsComponent,
        pathMatch: 'full',
      },
      {
        path: 'roadmap',
        component: IndexRoadmapComponent,
        pathMatch: 'full',
      },
      {
        path: 'newRoadmap',
        component: CreateRoadmapComponent,
        pathMatch: 'full',
      },
      {
        path: 'roadmap/:id',
        component: ShowRoadmapComponent,
        pathMatch: 'full',
      },
      {
        path: 'faq',
        component: IndexFaqComponent,
        pathMatch: 'full',
      },
      {
        path: 'newFaq',
        component: CreateFaqComponent,
        pathMatch: 'full',
      },
      {
        path: 'faq/:id',
        component: ShowFaqComponent,
        pathMatch: 'full',
      },
      {
        path: 'email',
        component: IndexEmailComponent,
        pathMatch: 'full',
      },
      {
        path: 'template',
        component: IndexTemplateComponent,
        pathMatch: 'full',
      },
      {
        path: 'newTemplate',
        component: CreateTemplateComponent,
        pathMatch: 'full',
      },
      {
        path: 'template/:id',
        component: ShowTemplateComponent,
        pathMatch: 'full',
      },
      {
        path: 'users',
        component: IndexUsersComponent,
        pathMatch: 'full',
      },
      {
        path: 'users/:id',
        component: ShowUsersComponent,
        pathMatch: 'full',
      },
      {
        path: 'dictionary',
        component: IndexDictionaryComponent,
        pathMatch: 'full',
      },
      {
        path: 'push',
        component: PushComponent,
        pathMatch: 'full',
      },
      {
        path: 'documents',
        component: IndexDocComponent,
        pathMatch: 'full',
      },
      {
        path: 'documents/:id',
        component: ShowDocComponent,
        pathMatch: 'full',
      },
      {
        path: 'newDocument',
        component: CreateDocComponent,
      },
      {
        path: 'videos',
        component: IndexVideosComponent,
        pathMatch: 'full',
      },
      {
        path: 'videos/:id',
        component: ShowVideosComponent,
        pathMatch: 'full',
      },
      {
        path: 'newVideo',
        component: CreateVideosComponent,
      },
      {
        path: 'exchanges',
        component: IndexExchangesComponent,
        pathMatch: 'full',
      },
      {
        path: 'exchanges/:id',
        component: ShowExchangesComponent,
        pathMatch: 'full',
      },
      {
        path: 'newExchange',
        component: CreateExchangesComponent,
      },
      {
        path: 'transaction',
        component: TransactionComponent,
        pathMatch: 'full',
      },
      {
        path: 'referral',
        component: ReferralComponent,
        pathMatch: 'full',
      },
      {
        path: 'administrator',
        component: IndexAdminComponent,
        pathMatch: 'full',
      },
      {
        path: 'administrator/:id',
        component: ShowAdminComponent,
        pathMatch: 'full',
      },
      {
        path: 'newAdministrator',
        component: CreateAdminComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class RoutingModule {}
