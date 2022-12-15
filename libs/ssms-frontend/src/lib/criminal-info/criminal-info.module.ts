import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CriminalInfoRoutingModule } from './criminal-info-routing.module';
import { CriminalInfoComponent } from './criminal-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [CriminalInfoComponent, ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CriminalInfoRoutingModule
  ]
})
export class CriminalInfoModule { }
