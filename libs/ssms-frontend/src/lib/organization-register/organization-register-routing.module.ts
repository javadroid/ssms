import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationManagementComponent } from '../organization-management/organization-management.component';
import { OrganizationRegisterComponent } from './organization-register.component';

const routes: Routes = [{path:'' ,component:OrganizationRegisterComponent},
{path:'list' ,component:OrganizationManagementComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRegisterRoutingModule { }
