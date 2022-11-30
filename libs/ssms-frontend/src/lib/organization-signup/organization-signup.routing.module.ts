import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationSignupComponent } from './organization-signup.component';


const routes: Routes = [{path: '', component:OrganizationSignupComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationSignupRoutingModule { }
