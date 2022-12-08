import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonnelRegisterComponent } from './personnel-register.component';

const routes: Routes = [{ path: '', component: PersonnelRegisterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonnelRegisterRoutingModule {}
