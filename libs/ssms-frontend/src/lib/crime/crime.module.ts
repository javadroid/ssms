import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrimeRoutingModule } from './crime-routing.module';
import { CrimeComponent } from './crime/crime.component';
import { CrimeHeaderComponent } from './crime-header/crime-header.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CreateCrimeComponent } from './create-crime/create-crime.component';

@NgModule({
  declarations: [CrimeComponent, CrimeHeaderComponent, CreateCrimeComponent],
  imports: [
    CommonModule,
    CrimeRoutingModule,
    ReactiveFormsModule,
  ],
})
export class CrimeModule {}
