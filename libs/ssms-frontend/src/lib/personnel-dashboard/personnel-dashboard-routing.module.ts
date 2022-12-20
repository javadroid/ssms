import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonnelDashboardComponent } from './personnel-dashboard.component';
import { PersonnelDashboardModule } from './personnel-dashboard.module';
import { CriminalManagementComponent } from '../criminal-management/criminal-management.component';
import { CrimeComponent } from '../crime/crime/crime.component';
import { CreateCrimeComponent } from '../crime/create-crime/create-crime.component';

const routes: Routes = [{path:'',component:PersonnelDashboardComponent,children:[
   {path: 'criminal',component:CriminalManagementComponent},
   {path: 'crime',component:CrimeComponent},
   {path: 'create-crime',component:CreateCrimeComponent}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnelDashboardRoutingModule { }
