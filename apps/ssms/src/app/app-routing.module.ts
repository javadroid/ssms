import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', component:AppComponent},

  {path: 'dashboard',loadChildren: () => import('@ssms/ssms-frontend').then(m => m.DashboardModule)},
  {path: 'report',loadChildren: () => import('@ssms/ssms-frontend').then(m => m.ReportModule)},
  {path: 'policy-info',loadChildren: () => import('@ssms/ssms-frontend').then(m => m.PolicyInfoModule)},
  {path: 'new-report',loadChildren: () => import('@ssms/ssms-frontend').then(m => m.NewReportModule)},
<<<<<<< HEAD
  {path: 'tabs',loadChildren: () => import('@ssms/ssms-frontend').then(m => m.TabsModule)},
  {path: 'index',loadChildren: () => import('@ssms/ssms-frontend').then(m => m.IndexsModule)},

=======
  {path: 'sign-up',loadChildren: () => import('@ssms/ssms-frontend').then(m => m.SignUpModule)},
  {path: 'login',loadChildren: () => import('@ssms/ssms-frontend').then(m => m.LoginModule)},
  
>>>>>>> 783fc9b4d29c634acdbab640bada37d438f487fd
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
