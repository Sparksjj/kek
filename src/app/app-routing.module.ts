import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './core/admin/admin.component';
import { AuthGuard } from './auth/auth-guard.service';
import { CreateAppComponent } from './custom/app/create-app/create-app.component';
import { CreateFaqComponent } from './custom/faq/create-faq/create-faq.component';
import { CreateNewsComponent } from './custom/news/create-news/create-news.component';
import { CreateRoadmapComponent } from './custom/roadmap/create-roadmap/create-roadmap.component';
import { CreateTeam2Component } from './custom/team2/create-team/create-team.component';
import { CreateTeamComponent } from './custom/team/create-team/create-team.component';
import { CreateTemplateComponent } from './custom/template/create-template/create-template.component';
import { HomeComponent } from './custom/home/home.component';
import { IndexAppComponent } from './custom/app/index-app/index-app.component';
import { IndexEmailComponent } from './custom/email/index-email/index-email.component';
import { IndexFaqComponent } from './custom/faq/index-faq/index-faq.component';
import { IndexNewsComponent } from './custom/news/index-news/index-news.component';
import { IndexRoadmapComponent } from './custom/roadmap/index-roadmap/index-roadmap.component';
import { IndexTeam2Component } from './custom/team2/index-team/index-team.component';
import { IndexTeamComponent } from './custom/team/index-team/index-team.component';
import { IndexTemplateComponent } from './custom/template/index-template/index-template.component';
import { NgModule } from '@angular/core';
import { ShowAppComponent } from './custom/app/show-app/show-app.component';
import { ShowFaqComponent } from './custom/faq/show-faq/show-faq.component';
import { ShowNewsComponent } from './custom/news/show-news/show-news.component';
import { ShowRoadmapComponent } from './custom/roadmap/show-roadmap/show-roadmap.component';
import { ShowTeam2Component } from './custom/team2/show-team/show-team.component';
import { ShowTeamComponent } from './custom/team/show-team/show-team.component';
import { ShowTemplateComponent } from './custom/template/show-template/show-template.component';

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
        pathMatch: 'full'
      },
      {
        path: 'app',
        component: IndexAppComponent,
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'newApp',
        component: CreateAppComponent,
        pathMatch: 'full'
      },
      {
        path: 'app/:id',
        component: ShowAppComponent,
        pathMatch: 'full'
      },
      {
        path: 'team',
        component: IndexTeamComponent,
        pathMatch: 'full'
      },
      {
        path: 'newTeam',
        component: CreateTeamComponent,
        pathMatch: 'full'
      },
      {
        path: 'team/:id',
        component: ShowTeamComponent,
        pathMatch: 'full'
      },
      {
        path: 'team2',
        component: IndexTeam2Component,
        pathMatch: 'full'
      },
      {
        path: 'newTeam2',
        component: CreateTeam2Component,
        pathMatch: 'full'
      },
      {
        path: 'team2/:id',
        component: ShowTeam2Component,
        pathMatch: 'full'
      },
      {
        path: 'news',
        component: IndexNewsComponent,
        pathMatch: 'full'
      },
      {
        path: 'newNews',
        component: CreateNewsComponent,
        pathMatch: 'full'
      },
      {
        path: 'news/:id',
        component: ShowNewsComponent,
        pathMatch: 'full'
      },
      {
        path: 'roadmap',
        component: IndexRoadmapComponent,
        pathMatch: 'full'
      },
      {
        path: 'newRoadmap',
        component: CreateRoadmapComponent,
        pathMatch: 'full'
      },
      {
        path: 'roadmap/:id',
        component: ShowRoadmapComponent,
        pathMatch: 'full'
      },
      {
        path: 'faq',
        component: IndexFaqComponent,
        pathMatch: 'full'
      },
      {
        path: 'newFaq',
        component: CreateFaqComponent,
        pathMatch: 'full'
      },
      {
        path: 'faq/:id',
        component: ShowFaqComponent,
        pathMatch: 'full'
      },
      {
        path: 'email',
        component: IndexEmailComponent,
        pathMatch: 'full'
      },
      {
        path: 'template',
        component: IndexTemplateComponent,
        pathMatch: 'full'
      },
      {
        path: 'newTemplate',
        component: CreateTemplateComponent,
        pathMatch: 'full'
      },
      {
        path: 'template/:id',
        component: ShowTemplateComponent,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule {}
