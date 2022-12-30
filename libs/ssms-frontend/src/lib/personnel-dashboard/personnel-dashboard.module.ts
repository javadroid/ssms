import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonnelDashboardRoutingModule } from './personnel-dashboard-routing.module';
import { PersonnelDashboardComponent } from './personnel-dashboard.component';
import { ViewReportComponent } from '../view-report/view-report.component';


@NgModule({
  declarations: [PersonnelDashboardComponent,ViewReportComponent],
  imports: [
    CommonModule,
    PersonnelDashboardRoutingModule
  ]
})
export class PersonnelDashboardModule { }
