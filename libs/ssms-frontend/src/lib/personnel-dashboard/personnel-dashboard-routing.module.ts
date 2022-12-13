import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonnelDashboardComponent } from './personnel-dashboard.component';
import { PersonnelDashboardModule } from './personnel-dashboard.module';

const routes: Routes = [{path:'',component:PersonnelDashboardComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnelDashboardRoutingModule { }
