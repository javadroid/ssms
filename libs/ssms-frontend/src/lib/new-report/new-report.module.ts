import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import { NewReportRoutingModule } from './new-report-routing.module';
import {NewReportComponent} from './new-report.component'

import { InputComponent } from '../shared/input/input.component';
import { TextareaComponent } from '../shared/textarea/textarea.component';

@NgModule({
  declarations: [NewReportComponent,InputComponent,TextareaComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NewReportRoutingModule,
  ]
})
export class NewReportModule { }
