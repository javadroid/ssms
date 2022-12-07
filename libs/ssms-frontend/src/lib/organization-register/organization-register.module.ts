import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRegisterRoutingModule } from './organization-register-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OrganizationRegisterComponent } from './organization-register.component';


@NgModule({
  declarations: [ OrganizationRegisterComponent],
  imports: [
    CommonModule,
    OrganizationRegisterRoutingModule,

    ReactiveFormsModule,
  ]
})
export class OrganizationRegisterModule { }
