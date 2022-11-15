import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', component:AppComponent},
  
  
  {path: 'report',loadChildren: () => import('@ssms/ssms-frontend').then(m => m.ReportModule)},
  {path: 'policy-info',loadChildren: () => import('@ssms/ssms-frontend').then(m => m.PolicyInfoModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
