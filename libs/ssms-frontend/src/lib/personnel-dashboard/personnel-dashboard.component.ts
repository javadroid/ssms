import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ssms-personnel-dashboard',
  templateUrl: './personnel-dashboard.component.html',
  styleUrls: ['./personnel-dashboard.component.css'],
})
export class PersonnelDashboardComponent implements OnInit {
  constructor(private route:Router) {}

  ngOnInit(): void {}

  onOutletLoaded(component:any) {
   console.log(component)

  }

  logout(){
    localStorage.clear()
    this.route.navigate(['/login'])
  }
}
