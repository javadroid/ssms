import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReportComponent],
  imports: [CommonModule,ReportRoutingModule,ReactiveFormsModule],
})
export class ReportModule {}
