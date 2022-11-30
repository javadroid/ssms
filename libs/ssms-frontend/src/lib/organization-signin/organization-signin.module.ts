import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationSigninRoutingModule } from './organization-signin-routing.module';
import { OrganizationSigninComponent } from './organization-signin.component';


@NgModule({
  declarations: [OrganizationSigninComponent],
  imports: [
    CommonModule,
    OrganizationSigninRoutingModule
  ]
})
export class OrganizationSigninModule { }
