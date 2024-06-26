import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from '@ssms/ssms-frontend';


// const routes: Routes = [
//   {path: '', component:AppComponent},

//   {path: 'report',loadChildren: () => import('@ssms/ssms-frontend').then(m => m.ReportModule)},
//   {path: 'policy-info',loadChildren: () => import('@ssms/ssms-frontend').then(m => m.PolicyInfoModule)}
// ];

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
