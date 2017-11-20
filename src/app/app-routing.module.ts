import { CreateAppComponent } from './custom/app/create-app/create-app.component';
import { IndexAppComponent } from './custom/app/index-app/index-app.component';
import { HomeComponent } from './custom/home/home.component';
import { AuthGuard } from './auth/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './core/admin/admin.component';
import { ShowAppComponent } from './custom/app/show-app/show-app.component';

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
        component: HomeComponent,
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
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'app',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule {}
