import { Component, OnInit, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@ssms/api-interfaces';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'ssms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  constructor(private http: Router) {

console.log( " http.getCurrentNavigation()",http.url)
  }
  ngOnInit(): void {
   if (isDevMode()) {
      console.log('Development!',process.env['NX_API_URL']);
    } else {
      console.log('Production!',process.env['NX_API_URL']);
    }
  }


}
