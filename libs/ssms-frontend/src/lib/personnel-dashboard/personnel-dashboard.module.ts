import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonnelDashboardRoutingModule } from './personnel-dashboard-routing.module';
import { PersonnelDashboardComponent } from './personnel-dashboard.component';


@NgModule({
  declarations: [PersonnelDashboardComponent],
  imports: [
    CommonModule,
    PersonnelDashboardRoutingModule
  ]
})
export class PersonnelDashboardModule { }
