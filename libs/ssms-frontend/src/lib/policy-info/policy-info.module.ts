import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyInfoComponent } from './policy-info.component';
import { PolicyInfoRoutingModule } from './policy-info-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [PolicyInfoComponent],
  imports: [
    CommonModule,PolicyInfoRoutingModule,HttpClientModule
  ]
})
export class PolicyInfoModule { }
