import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewReportComponent} from './new-report.component'
const routes: Routes = [{path:'', component:NewReportComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewReportRoutingModule { }
