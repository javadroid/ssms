import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrimeComponent } from './crime/crime.component';
import { CreateCrimeComponent } from './create-crime/create-crime.component';

const routes: Routes = [
  {path: '', component: CrimeComponent},
  {path: 'create', component: CreateCrimeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrimeRoutingModule { }
