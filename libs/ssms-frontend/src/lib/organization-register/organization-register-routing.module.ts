import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationRegisterComponent } from './organization-register.component';

const routes: Routes = [{path:'' ,component:OrganizationRegisterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRegisterRoutingModule { }
