import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexsComponent } from './indexs.component';

const routes: Routes = [{path: '', component:IndexsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexsRoutingModule { }
