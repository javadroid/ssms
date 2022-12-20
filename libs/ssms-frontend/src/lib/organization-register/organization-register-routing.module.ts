import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationManagementComponent } from '../organization-management/organization-management.component';
import { OrganizationRegisterComponent } from './organization-register.component';
import { ManageRefComponent } from '../manage-ref/manage-ref.component';

const routes: Routes = [{path:'' ,component:OrganizationRegisterComponent,children:[
  {path:'list' ,component:OrganizationManagementComponent},{path:'ref' ,component:ManageRefComponent},
]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRegisterRoutingModule { }
