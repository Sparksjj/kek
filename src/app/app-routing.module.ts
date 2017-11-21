import { CreateNewsComponent } from './custom/news/create-news/create-news.component';
import { IndexNewsComponent } from './custom/news/index-news/index-news.component';
import { IndexTeamComponent } from './custom/team/index-team/index-team.component';
import { CreateAppComponent } from './custom/app/create-app/create-app.component';
import { IndexAppComponent } from './custom/app/index-app/index-app.component';
import { HomeComponent } from './custom/home/home.component';
import { AuthGuard } from './auth/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './core/admin/admin.component';
import { ShowAppComponent } from './custom/app/show-app/show-app.component';
import { CreateTeamComponent } from './custom/team/create-team/create-team.component';
import { ShowTeamComponent } from './custom/team/show-team/show-team.component';
import { ShowNewsComponent } from './custom/news/show-news/show-news.component';

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
        redirectTo: 'app',
        pathMatch: 'full'
      },
      {
        path: 'app',
        component: IndexAppComponent,
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
