import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriminalInfoComponent } from './criminal-info.component';

const routes: Routes = [{path:'', component:CriminalInfoComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CriminalInfoRoutingModule { }
