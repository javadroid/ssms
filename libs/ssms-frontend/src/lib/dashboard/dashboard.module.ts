import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { OrganizationUpdateComponent } from '../organization-update/organization-update.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, OrganizationUpdateComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
