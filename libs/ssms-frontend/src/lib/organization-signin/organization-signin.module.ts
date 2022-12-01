import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationSigninRoutingModule } from './organization-signin-routing.module';
import { OrganizationSigninComponent } from './organization-signin.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [OrganizationSigninComponent],
  imports: [
    CommonModule,
    OrganizationSigninRoutingModule,
    ReactiveFormsModule,
    OrganizationSigninRoutingModule
  ],
  bootstrap:[OrganizationSigninComponent ]
})
export class OrganizationSigninModule { }
