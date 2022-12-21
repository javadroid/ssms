import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationAuthGuard, PersonnelAuthGuard } from '@ssms/ssms-frontend';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full'},

  {
    canActivate: [OrganizationAuthGuard],
    path: 'dashboard',
    loadChildren: () =>
      import('@ssms/ssms-frontend').then((m) => m.DashboardModule),
    // children: [{ path: 'cc', component:AppComponent }],
  },
  {
    canActivate: [PersonnelAuthGuard],
    path: 'home',
    loadChildren: () =>
      import('@ssms/ssms-frontend').then((m) => m.PersonnelDashboardModule),
  },
  {
    path: 'report',
    loadChildren: () =>
      import('@ssms/ssms-frontend').then((m) => m.ReportModule),
  },
  {
    path: 'policy-info',
    loadChildren: () =>
      import('@ssms/ssms-frontend').then((m) => m.PolicyInfoModule),
  },
  {
    path: 'new-report',
    loadChildren: () =>
      import('@ssms/ssms-frontend').then((m) => m.NewReportModule),
  },
  {
    path: 'tabs',
    loadChildren: () => import('@ssms/ssms-frontend').then((m) => m.TabsModule),
  },
  {
    path: 'index',
    loadChildren: () =>
      import('@ssms/ssms-frontend').then((m) => m.IndexsModule),
  },
  {
    path: 'organization-signup',
    loadChildren: () =>
      import('@ssms/ssms-frontend').then((m) => m.OrganizationSignupModule),
  },
  {
    path: 'organization-signin',
    loadChildren: () =>
      import('@ssms/ssms-frontend').then((m) => m.OrganizationSigninModule),
  },

  // {
  //   path: 'crime',
  //   loadChildren: () =>
  //     import('@ssms/ssms-frontend').then((m) => m.CrimeModule),
  // },
  // {
  //   path: 'personnel-register',
  //   loadChildren: () =>
  //     import('@ssms/ssms-frontend').then((m) => m.PersonnelRegisterModule),
  // },

  {
    path: 'organization-register',
    loadChildren: () =>
      import('@ssms/ssms-frontend').then((m) => m.OrganizationRegisterModule),
  },

  // {
  //   path: './**', redirectTo: 'dashboard', pathMatch: 'full'
  //  },

  {
    path: 'login',
    loadChildren: () =>
      import('@ssms/ssms-frontend').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
