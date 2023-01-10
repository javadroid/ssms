import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchComponent } from './branch/branch.component';


const routes: Routes = [
  {path: '', component:BranchComponent},
  {path: 'victim', component:BranchComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class RefFrontRoutingModule {}
