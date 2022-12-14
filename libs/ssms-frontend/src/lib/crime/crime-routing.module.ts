import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrimeComponent } from './crime/crime.component';

const routes: Routes = [
  {path: '', component: CrimeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrimeRoutingModule { }
