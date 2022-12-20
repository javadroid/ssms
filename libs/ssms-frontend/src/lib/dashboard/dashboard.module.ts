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
import { ManageRefComponent } from '../manage-ref/manage-ref.component';
import { CreateCrimeComponent } from '../crime/create-crime/create-crime.component';
import { CrimeHeaderComponent } from '../crime/crime-header/crime-header.component';
import { CrimeComponent } from '../crime/crime/crime.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ManageRefComponent,
    CriminalManagementComponent,
    OrganizationUpdateComponent,
    SignUpComponent,
    PersonnelRegisterComponent,
    MainDashboardComponent,CrimeComponent, CrimeHeaderComponent, CreateCrimeComponent
  ],
  imports: [CommonModule, DashboardRoutingModule, ReactiveFormsModule],
})
export class DashboardModule {}
