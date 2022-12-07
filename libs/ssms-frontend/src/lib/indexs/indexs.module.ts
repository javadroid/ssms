import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IndexsComponent } from './indexs.component';
import { IndexsRoutingModule } from './indexs-routing.module';




@NgModule({
  declarations: [IndexsComponent],
  imports: [
    CommonModule,IndexsRoutingModule,HttpClientModule
  ]
})
export class IndexsModule { }
