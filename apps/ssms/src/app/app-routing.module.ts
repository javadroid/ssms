import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', component:AppComponent},

  {path: 'dashboard',loadChildren: () => import('@ssms/ssms-frontend').then(m => m.DashboardModule)},
  {path: 'report',loadChildren: () => import('@ssms/ssms-frontend').then(m => m.ReportModule)},
  {path: 'policy-info',loadChildren: () => import('@ssms/ssms-frontend').then(m => m.PolicyInfoModule)},
  {path: 'new-report',loadChildren: () => import('@ssms/ssms-frontend').then(m => m.NewReportModule)},
  {path: 'tabs',loadChildren: () => import('@ssms/ssms-frontend').then(m => m.TabsModule)},
  {path: 'index',loadChildren: () => import('@ssms/ssms-frontend').then(m => m.IndexsModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
