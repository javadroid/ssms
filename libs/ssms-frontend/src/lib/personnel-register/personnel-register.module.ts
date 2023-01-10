import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonnelRegisterComponent } from './personnel-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonnelRegisterRoutingModule } from './personnel-register.routing.module';

@NgModule({
  declarations: [PersonnelRegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PersonnelRegisterRoutingModule,
    FormsModule,
  ],
  bootstrap: [PersonnelRegisterComponent],
})
export class PersonnelRegisterModule {}
