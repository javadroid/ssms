import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceApi } from '../shared/service/service-api';

@Component({
  selector: 'ssms-personnel-dashboard',
  templateUrl: './personnel-dashboard.component.html',
  styleUrls: ['./personnel-dashboard.component.css'],
})
export class PersonnelDashboardComponent implements OnInit {
  constructor(private route:Router,private http:ServiceApi) {}
  personnelData=[] as any
  organizationData=[] as any
  id = localStorage.getItem('id');
  ngOnInit(): void {

    console.log(this.id);
    if (this.id) {
      this.http.findOne('personnel', this.id).subscribe((e) => {
        console.log("e",e);
        this.personnelData=[e]
        this.http.findOne('organization', e.organizationId).subscribe(a=>{
          this.organizationData=[a]
        })


      });
    }
  }

  onOutletLoaded(component:any) {
    component.personnelData=this.personnelData
    component.organizationData=this.organizationData
  //  console.log(component)

  }

  logout(){
    localStorage.clear()
    this.route.navigate(['/login'])
  }
}
