import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report.component';
import { ViewReportComponent } from '../view-report/view-report.component';

const routes: Routes = [{path: '', component:ReportComponent},


  {
    path: 'view',
    component: ViewReportComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
