import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from '../main-dashboard/main-dashboard.component';
import { PersonnelRegisterComponent } from '../personnel-register/personnel-register.component';
import { CanAuth } from '../shared/guard/can.guard';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
      },

      {
        path: 'main',
        component: MainDashboardComponent,
      },
      {
        path: 'personnel',
        component: PersonnelRegisterComponent,
      },
    ],

  },

  {
    path: 'can',
    component: MainDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
