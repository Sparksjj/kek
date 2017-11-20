import { CreateAppComponent } from './custom/app/create-app/create-app.component';
import { IndexAppComponent } from './custom/app/index-app/index-app.component';
import { HomeComponent } from './custom/home/home.component';
import { AuthGuard } from './auth/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardV1Component } from './demo/custom-pages/dashboard-v1/dashboard-v1.component';
import { AdminComponent } from './core/admin/admin.component';
import { ButtonsComponent } from './demo/components/buttons/buttons.component';
import { CardsComponent } from './demo/components/cards/cards.component';
import { DialogsComponent } from './demo/components/dialogs/dialogs.component';
import { GridListComponent } from './demo/components/grid-list/grid-list.component';
import { ListsComponent } from './demo/components/lists/lists.component';
import { MenuComponent } from './demo/components/menu/menu.component';
import { SliderComponent } from './demo/components/slider/slider.component';
import { SnackBarComponent } from './demo/components/snack-bar/snack-bar.component';
import { TooltipComponent } from './demo/components/tooltip/tooltip.component';
import { FormElementsComponent } from './demo/forms/form-elements/form-elements.component';
import { FormWizardComponent } from './demo/forms/form-wizard/form-wizard.component';
import { IconsComponent } from './demo/icons/icons.component';
import { Level5Component } from './demo/levels/level5/level5.component';
import { GoogleMapsComponent } from './demo/maps/google-maps/google-maps.component';
import { SimpleTableComponent } from './demo/tables/simple-table/simple-table.component';
import { FixedHeaderTableComponent } from './demo/tables/fixed-header-table/fixed-header-table.component';
import { LoginComponent } from './demo/custom-pages/login/login.component';
import { RegisterComponent } from './demo/custom-pages/register/register.component';
import { ForgotPasswordComponent } from './demo/custom-pages/forgot-password/forgot-password.component';
import { EditorComponent } from './demo/editor/editor.component';
import { DashboardComponent } from './demo/dashboard/dashboard.component';
import { DragAndDropComponent } from './demo/drag-and-drop/drag-and-drop.component';
import { InboxComponent } from './demo/apps/inbox/inbox.component';
import { CalendarComponent } from './demo/apps/calendar/calendar.component';
import { ChatComponent } from './demo/apps/chat/chat.component';
import { AutocompleteComponent } from './demo/components/autocomplete/autocomplete.component';
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
