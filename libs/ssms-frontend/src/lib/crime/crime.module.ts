import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrimeRoutingModule } from './crime-routing.module';
import { CrimeComponent } from './crime/crime.component';
import { CrimeHeaderComponent } from './crime-header/crime-header.component';

@NgModule({
  declarations: [CrimeComponent, CrimeHeaderComponent],
  imports: [CommonModule, CrimeRoutingModule],
})
export class CrimeModule {}
