import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceApi } from '../shared/service/service-api';

@Component({
  selector: 'ssms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  subcriber = localStorage.getItem('id');
  newOrg = false;
  constructor(private http: ServiceApi, private route: Router) {}

  ngOnInit(): void {
    // console.log(e);
        console.log(this.subcriber);
    if (this.subcriber) {
      this.http.findOne('organization', this.subcriber).subscribe((e) => {
        console.log(e);
        console.log(this.subcriber);
        if (e.status === 'INACTIVE') {
          this.newOrg = true;
        }
      });
    }
  }

  onAdd() {
    console.log('yes');
    this.route.navigate(['/new-report']);
  }
}
