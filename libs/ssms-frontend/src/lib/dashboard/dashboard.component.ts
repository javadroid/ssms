import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceApi } from '../shared/service/service-api';

@Component({
  selector: 'ssms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  allReport=[]as any[]
  constructor(private http:ServiceApi,private route: Router) {}

  ngOnInit(): void {
    this.http.find('report').subscribe(e=>{
    this.allReport=e
    })
  }

  onAdd(){
    console.log("yes")
    this.route.navigate(['/new-report'])
  }

}
