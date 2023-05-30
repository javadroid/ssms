import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@ssms/api-interfaces';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'ssms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(private http: Router) {
    console.log(" http.getCurrentNavigation()", http.url)
  }


}
