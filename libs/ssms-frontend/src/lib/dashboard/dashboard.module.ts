import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { OrganizationUpdateComponent } from '../organization-update/organization-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { PersonnelRegisterComponent } from '../personnel-register/personnel-register.component';
import { MainDashboardComponent } from '../main-dashboard/main-dashboard.component';
import { CriminalManagementComponent } from '../criminal-management/criminal-management.component';

@NgModule({
  declarations: [DashboardComponent,CriminalManagementComponent, OrganizationUpdateComponent,SignUpComponent,PersonnelRegisterComponent,MainDashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
