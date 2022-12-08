import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrimeFormComponent } from './components/crime-form/crime-form.component';

const routes: Routes = [{ path: '', component: CrimeFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrimeRoutingModule {}
