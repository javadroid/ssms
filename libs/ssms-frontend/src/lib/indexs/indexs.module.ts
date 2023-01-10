import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IndexsComponent } from './indexs.component';
import { IndexsRoutingModule } from './indexs-routing.module';




@NgModule({
  declarations: [IndexsComponent],
  imports: [
    CommonModule,IndexsRoutingModule,HttpClientModule
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IndexsModule { }
