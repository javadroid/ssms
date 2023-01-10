import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { TabsRoutingModule } from './tabs-routing.module';
import {ReactiveFormsModule} from '@angular/forms'



@NgModule({
  declarations: [TabsComponent],
  imports: [
    CommonModule,TabsRoutingModule,ReactiveFormsModule
  ]
})
export class TabsModule { }
