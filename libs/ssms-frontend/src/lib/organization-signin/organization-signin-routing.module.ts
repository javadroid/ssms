import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationSigninComponent } from './organization-signin.component';

const routes: Routes = [{path: '', component:OrganizationSigninComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationSigninRoutingModule { }
