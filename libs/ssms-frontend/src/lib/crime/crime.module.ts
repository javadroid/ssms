import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrimeRoutingModule } from './crime-routing.module';
import { CrimeFormComponent } from './components/crime-form/crime-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CrimeFormComponent],
  imports: [CommonModule, ReactiveFormsModule, CrimeRoutingModule],
})
export class CrimeModule {}
