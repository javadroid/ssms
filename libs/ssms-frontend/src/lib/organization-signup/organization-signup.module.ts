import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrganizationSignupComponent } from './organization-signup.component';
import { ReactiveFormsModule } from '@angular/forms';

import { OrganizationSignupRoutingModule } from './organization-signup.routing.module';



@NgModule({
  declarations: [OrganizationSignupComponent],
  imports: [
    OrganizationSignupRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    
  ],
  bootstrap:[OrganizationSignupComponent]
})
export class OrganizationSignupModule { }
