import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import { NewReportRoutingModule } from './new-report-routing.module';
import {NewReportComponent} from './new-report.component'

import { InputComponent } from '../input/input.component';

@NgModule({
  declarations: [NewReportComponent,InputComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NewReportRoutingModule,
  ]
})
export class NewReportModule { }
