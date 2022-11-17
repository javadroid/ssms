import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewReportRoutingModule } from './view-report-routing.module';
import { ViewReportComponent } from './view-report.component';


@NgModule({
  declarations: [ViewReportComponent],
  imports: [
    CommonModule,
    ViewReportRoutingModule
  ]
})
export class ViewReportModule { }
