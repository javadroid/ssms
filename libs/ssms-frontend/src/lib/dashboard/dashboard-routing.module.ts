import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriminalManagementComponent } from '../criminal-management/criminal-management.component';
import { MainDashboardComponent } from '../main-dashboard/main-dashboard.component';
import { ManageRefComponent } from '../manage-ref/manage-ref.component';
import { PersonnelRegisterComponent } from '../personnel-register/personnel-register.component';
import { CanAuth } from '../shared/guard/can.guard';
import { DashboardComponent } from './dashboard.component';
import { CrimeComponent } from '../crime/crime/crime.component';
import { CreateCrimeComponent } from '../crime/create-crime/create-crime.component';
import { ViewReportComponent } from '../view-report/view-report.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'main',
        component: MainDashboardComponent,
      },
      {
        path: 'personnel',
        component: PersonnelRegisterComponent,
      },
      {
        path: 'criminal',
        component: CriminalManagementComponent,
      },
      {
        path: 'ref',
        component: ManageRefComponent,
      },

      {
        path: 'crime',
        component: CrimeComponent,
      },
      {
        path: 'report',
        component: ViewReportComponent,
      },
      { path: 'create-crime', component: CreateCrimeComponent },
      {
        path: '**',
        redirectTo: 'main',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
