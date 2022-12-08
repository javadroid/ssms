import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: AppComponent },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('@ssms/ssms-frontend').then((m) => m.DashboardModule),
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
  {
    path: 'personnel-register',
    loadChildren: () =>
      import('@ssms/ssms-frontend').then((m) => m.PersonnelRegisterModule),
  },
  {
    path: 'organization-register',
    loadChildren: () =>
      import('@ssms/ssms-frontend').then((m) => m.OrganizationRegisterModule),
  },

  {
    path: 'sign-up',
    loadChildren: () =>
      import('@ssms/ssms-frontend').then((m) => m.SignUpModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@ssms/ssms-frontend').then((m) => m.LoginModule),
  },

  {
    path: 'sign-up',
    loadChildren: () =>
      import('@ssms/ssms-frontend').then((m) => m.SignUpModule),
  },
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
