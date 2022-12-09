import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchComponent } from './branch/branch.component';
import { DepartmentComponent } from './department/department.component';
import { LgaComponent } from './lga/lga.component';
import { StateComponent } from './state/state.component';
import { StationComponent } from './station/station.component';
import { OrganizationCategoryComponent } from './organization-category/organization-category.component';
import { OrganizationNameComponent } from './organization-name/organization-name.component';
import { RefFrontRoutingModule } from './ref-front.routing.module';
import { ApiService } from './api.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule,RefFrontRoutingModule,ReactiveFormsModule],
  declarations: [
    BranchComponent,
    DepartmentComponent,
    LgaComponent,
    StateComponent,
    StationComponent,
    OrganizationCategoryComponent,
    OrganizationNameComponent,
  ],
  providers:[ApiService]
})
export class RefFrontModule {}
